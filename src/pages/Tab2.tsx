import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem } from '@ionic/react';
import FilterToggle from '../components/FilterToggle';
import { useEffect, useState } from 'react';
import { DiskStorageService } from '../services/DiskStorageService';
import WalletTopHalfComponent from '../components/WalletTopHalfComponent';
import WalletBottomHalfComponent from '../components/WalletBottomHalfComponent';
import { ModuleNode } from 'vite';
import { UtilityMethods } from '../utils/utilitymethods';
import { useIonViewWillEnter } from '@ionic/react';
import { enterOutline } from 'ionicons/icons';
import { DoughnutData } from '../utils/utilitymethods';

export default function Tab2() {
  const [cashflow, setCashflow] = useState(0);
  const [totalwealth, setTotalwealth] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [tincome, setTincome] = useState(0);
  const [texpense, setTexpense] = useState(0);
  const [mcashflow, setMcashflow] = useState<number[]>([]);
  const [expensedoughnutData, setExpensedoughnutData] = useState<DoughnutData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        hoverOffset: 4
      }
    ]
  });
  const [incomedoughnutData, setIncomedoughnutData] = useState<DoughnutData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
        hoverOffset: 4
      }
    ]
  });


  const initData = async () => {
      //current month data
      const entries = await DiskStorageService.loadEntries();
      let income = 0;
      entries.filter(e => e.type === 'income').forEach((e) => {
        income = income + e.amount;
      });
      let expense = 0;
      entries.filter(e => e.type === 'expense').forEach((e) => {
        expense = expense + e.amount;
      });
      let cash_flow = income-expense;

      //past data
      const past_data = await DiskStorageService.loadPastData();
      let total_wealth = Object.values(past_data).reduce((s, month) => {
        const month_balance = month.income - month.expense;
        s = s + month_balance;
        return s;
      }, 0)
      total_wealth = total_wealth + cash_flow;

      let t_income = Object.values(past_data).reduce((s, month) => {
        s = s + month.income;
        return s;
      }, 0)
      t_income = t_income + income;

      let t_expense = Object.values(past_data).reduce((s, month) => {
        s = s + month.expense;
        return s;
      }, 0)
      t_expense = t_expense + expense;

      //calculating monthly cash-flow data
      let mcf: number[] = [];
      Object.values(past_data).forEach((e) => {
        const monthly_cashflow = e.income - e.expense;
        mcf.push(monthly_cashflow);
      })
      const idx = UtilityMethods.getCurrentMonth() - 1;
      const updated_mcf = mcf.with(idx, cash_flow);

      //set all state
      setIncome(income);
      setExpense(expense);
      setCashflow(cash_flow);
      setTotalwealth(total_wealth);
      setTincome(t_income);
      setTexpense(t_expense);
      setMcashflow(updated_mcf);

      //doughnut data -
      // expenses doughnut
      let expenseEntries = entries.filter(e => e.type === 'expense');
      let expenseCategories: string[] = expenseEntries.map(e => e.expense_category ?? 'General');
      let expenseValues: number[] = [];
      expenseCategories.forEach((category) => {
        let catsum = 0;
        expenseEntries.forEach((entry) => {
          if(entry.expense_category === category) {
            catsum = catsum + entry.amount;
          }
        })
        expenseValues.push(catsum);
      })
    
      // income doughnut
      let incomeEntries = entries.filter(e => e.type === 'income');
      let incomeSources: string[] = incomeEntries.map(e => e.income_source ?? 'General');
      let incomeValues: number[] = [];
      incomeSources.forEach((source) => {
        let catsum = 0;
        incomeEntries.forEach((entry) => {
          if(entry.income_source === source) {
            catsum = catsum + entry.amount;
          }
        })
        incomeValues.push(catsum);
      })

      //set doughnut data state
      setExpensedoughnutData({
        labels: expenseCategories,
        datasets: [{
          label: 'Expenses',
          data: expenseValues,
          backgroundColor: [
            '#5470c6',
            '#91cc75', 
            '#fac858', 
            '#ee6666', 
            '#73c0de', 
            '#3ba272', 
            '#fc8452', 
            '#9a60b4', 
            '#ea7ccc'  
          ],
          hoverOffset: 10
        }]
      });

      setIncomedoughnutData({
        labels: incomeSources,
        datasets: [{
          label: 'Income',
          data: incomeValues,
          backgroundColor: ['#91cc75', '#3ba272', '#fac858'],
          hoverOffset: 10
        }]
      });
    }

  useIonViewWillEnter(() => {
    initData();
  });
  
  useEffect(() => {
    initData();
  }, []);

  function currentMonthYear() {
    const todaysDate: string = new Date().toISOString().split('T')[0];
    const current_year = Number(todaysDate.split("-")[0]);
    const current_month_number = Number(todaysDate.split("-")[1]);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_month = months[Number(current_month_number)-1];
    return `${current_month}, ${current_year}`;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{currentMonthYear()}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <WalletTopHalfComponent totalIncome={String(tincome.toFixed(2))} totalExpenses={String(texpense.toFixed(2))} monthlycashflow={mcashflow}/>
        <WalletBottomHalfComponent expenseDoughnutdata={expensedoughnutData} incomeDoughnutdata={incomedoughnutData}/>
      </IonContent>
    </IonPage>
  );
}

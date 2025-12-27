import React, { useEffect } from 'react';
import { IonContent, IonIcon, IonItem, IonLabel, IonSegment, IonSegmentButton, SegmentChangeEventDetail } from '@ionic/react';
import WalletSegmentToggle from './WalletSegmentToggle';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

interface YaxisData {
  label: string,
  data: number[],
  backgroundColor: string
}

interface BarData {
  labels: string[],
  datasets: YaxisData[]
}

function WalletTopHalfComponent(props: { totalIncome: string, totalExpenses: string, monthlycashflow: number[] }) {

  const [filter, setFilter] = useState('cashflow');
  const [balance, setBalance] = useState(0);
  const [bgraphdata, setBgraphdata] = useState<BarData>({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Cashflow',
          data: props.monthlycashflow,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    });

  useEffect(() => {
    const bal = Number(props.totalIncome) - Number(props.totalExpenses);
    setBalance(bal);
  }, []);

  return (
    <>
      <WalletSegmentToggle value={filter} onChange={setFilter} />
      {filter === 'cashflow' && (
        // show bar chart for Month v/s Cash-flow
        <div style={{ overflowX: 'auto' }}>
            <Bar data={bgraphdata} />
        </div>
      )}

      <div style={{ height: '20px' }} />

      {filter === 'totalwealth' && (
        // show text data
        // Total income = ---
        // Total expenses = ---
        // Wallet balance = --- [green/red color text]
        <div className="ion-padding ion-text-center" style={{backgroundColor: 'lightskyblue', borderRadius: '5px'}}>
          <IonItem>
            <IonLabel style={{ fontSize: '1.5rem', fontWeight: 'bold' }} color='warning'>
              Total Income:
            </IonLabel>
            <IonLabel style={{ fontSize: '1.5rem', fontWeight: 'bold' }} color='success'>
              {props.totalIncome}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel style={{ fontSize: '1.5rem', fontWeight: 'bold' }} color='warning'>
              Total Expenses:
            </IonLabel>
            <IonLabel style={{ fontSize: '1.5rem', fontWeight: 'bold' }} color='danger'>
              {props.totalExpenses}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel style={{ fontSize: '1.5rem', fontWeight: 'bold' }} color='warning'>
              Wallet Balance:
            </IonLabel>
            <IonLabel style={{ fontSize: '1.5rem', fontWeight: 'bold', color: balance >= 0 ? 'var(--ion-color-success, green)' : 'var(--ion-color-danger, red)'}}>
              € {balance < 0 ? '-' : ''}{balance}
            </IonLabel>
          </IonItem>
        </div>
      )}
    </>
  );
}

export default WalletTopHalfComponent;
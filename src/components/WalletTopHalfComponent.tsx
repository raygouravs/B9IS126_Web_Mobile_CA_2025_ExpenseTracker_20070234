/*
  REFERENCE: NPM (2025) react-chartjs-2 docs. Available at: https://www.npmjs.com/package/react-chartjs-2
*/

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
  const bgraphdata = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Cashflow',
          data: props.monthlycashflow,
          backgroundColor: props.monthlycashflow.map(value => 
            value >= 0 
              ? 'rgba(75, 192, 192, 0.6)'
              : 'rgba(255, 99, 132, 0.6)'
          ),
          borderColor: props.monthlycashflow.map(value => 
            value >= 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'
          ),
          borderWidth: 1,
        },
     ],
  };
    
  return (
    <>
      <WalletSegmentToggle value={filter} onChange={setFilter} />
      {filter === 'cashflow' && (
        // show bar chart for Month v/s Cash-flow
        <div style={{ overflowX: 'auto', height: '280px' }}>
            <Bar data={bgraphdata} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: (tickValue: string | number) => {
                          const value =
                            typeof tickValue === 'string' ? Number(tickValue) : tickValue;

                          return `€${value.toLocaleString()}`;
                        },
                      },
                    },
                  },
                }}/>
        </div>
      )}

      <div style={{ height: '20px' }} />

      {filter === 'totalwealth' && (
        // show text data
        // Total income = ---
        // Total expenses = ---
        // Wallet balance = --- [green/red color text]
        <div className="ion-padding ion-text-center" style={{backgroundColor: 'lightgoldenrodyellow', borderRadius: '15px', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <IonItem lines='none' style={{'--border-radius': '15px'}}>
            <IonLabel style={{ fontSize: '1.1rem', fontWeight: 'bold' }} color='warning'>
              Total Income:
            </IonLabel>
            <IonLabel style={{ fontSize: '1.3rem', fontWeight: 'bold' }} color='success'>
              € {props.totalIncome}
            </IonLabel>
          </IonItem>
          <div style={{height: '7px'}}/>
          <IonItem lines='none' style={{'--border-radius': '15px'}}>
            <IonLabel style={{ fontSize: '1.1rem', fontWeight: 'bold' }} color='warning'>
              Total Expenses:
            </IonLabel>
            <IonLabel style={{ fontSize: '1.3rem', fontWeight: 'bold' }} color='danger'>
              € {props.totalExpenses}
            </IonLabel>
          </IonItem>
          <div style={{height: '7px'}}/>
          <IonItem lines='none' style={{'--border-radius': '15px'}}>
            <IonLabel style={{ fontSize: '1.1rem', fontWeight: 'bold' }} color='warning'>
              Wallet Balance:
            </IonLabel>
            <IonLabel style={{ fontSize: '1.3rem', fontWeight: 'bold', color: (Number(props.totalIncome)-Number(props.totalExpenses)) >= 0 ? 'var(--ion-color-success, green)' : 'var(--ion-color-danger, red)'}}>
              € {Number(props.totalIncome)-Number(props.totalExpenses)}
            </IonLabel>
          </IonItem>
        </div>
      )}
    </>
  );
}

export default WalletTopHalfComponent;
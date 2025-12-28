/*
  REFERENCE: Ionic (2025) Ion Fab UI component. Available at: https://ionicframework.com/docs/api/fab
*/

import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonFab, IonFabButton, IonIcon,
  useIonRouter, IonItem, IonLabel
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { DiskStorageService } from '../services/DiskStorageService';
import EntryListView from '../components/EntryListView';
import FilterToggle from '../components/FilterToggle';
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
import { Bar } from 'react-chartjs-2';
import { useIonViewWillEnter } from '@ionic/react';

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

export default function Tab1() {
  const ionRouter = useIonRouter();
  const [entries, setEntries] = useState<any[]>([]);
  //const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');
  let datas = [0, 0];
  const [bgraphdata, setBgraphdata] = useState({
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Cashflow',
          data: datas,
          backgroundColor: datas.map((item, index) => 
            index == 0 
              ? 'rgba(75, 192, 192, 0.6)'
              : 'rgba(255, 99, 132, 0.6)'
          ),
          borderColor: datas.map((item, index) => 
            index == 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'
          ),
          borderWidth: 1,
        },
     ],
  });

  useEffect(() => {
    DiskStorageService.loadEntries().then(setEntries);
  }, []); 

  useEffect(() => {
  const handler = (event: CustomEvent) => {
    setEntries(event.detail);
  };
   window.addEventListener('entries:updated', handler as EventListener);
   return () => window.removeEventListener('entries:updated', handler as EventListener);
  }, []);

  const loadGraph = async () => {
    let income = 0;
    let expenses = 0;
    let entries = await DiskStorageService.loadEntries();
    entries.forEach((e) => {
      if(e.type === 'income') {
        income = income + e.amount;
      }
      if(e.type === 'expense'){
        expenses = expenses + e.amount;
      }
    })
    const newdatas = [income, expenses];
    setBgraphdata({
      labels: ['Income', 'Expense'],
      datasets: [
        {
          label: 'Cashflow',
          data: newdatas,
          backgroundColor: newdatas.map((item, index) => 
            index == 0 
              ? 'rgba(75, 192, 192, 0.6)'
              : 'rgba(255, 99, 132, 0.6)'
          ),
          borderColor: newdatas.map((item, index) => 
            index == 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)'
          ),
          borderWidth: 1,
        },
     ],
    });
  }

  useIonViewWillEnter(() => {
    loadGraph();
  })

  const filtered = entries
    .filter(e => filter === 'all' || e.type === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  const sortedEntries = filtered.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Timeline</IonTitle>
        </IonToolbar>
      </IonHeader>
        <div style={{ backgroundColor: '#f4f5f8' }}>
          <div style={{ height: '0px' }} />
          <div style={{ overflowX: 'auto', height: '150px', marginLeft: '20px', marginRight: '20px', marginTop: '20px', marginBottom: '10px', backgroundColor: 'white', borderRadius: '8px' }}>
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
          <div style={{ height: '5px' }} />
        </div>
      <IonItem color='light' lines="none">
        <FilterToggle value={filter} onChange={setFilter} />
      </IonItem>
      <IonContent color='light'>
        {entries.length === 0 && (
          <IonItem color='dark'>
            <IonLabel className="ion-text-wrap" color='warning'>No entries to show. Use the + button to add some entries!</IonLabel>
          </IonItem>
        )}
        <EntryListView entries={sortedEntries} setEntries={setEntries} reloadGraph={loadGraph}/>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => ionRouter.push('/add', 'forward')} color='warning'>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

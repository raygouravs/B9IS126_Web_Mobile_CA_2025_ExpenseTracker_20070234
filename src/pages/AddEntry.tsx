import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonFab, IonFabButton, IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { DiskStorageService } from '../services/DiskStorageService';
import EntryListView from '../components/EntryListView';
import FilterToggle from '../components/FilterToggle';

export default function AddEntry({ history }: any) {
    const [entries, setEntries] = useState<any[]>([]);
  //const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    DiskStorageService.loadEntries().then(setEntries);
  }, []);

  const filtered = entries
    .filter(e => filter === 'all' || e.type === filter)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Timeline</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <FilterToggle value={filter} onChange={setFilter} />
        <EntryListView entries={filtered} setEntries={setEntries}/>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton onClick={() => history.push('/add')} color="teal">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}
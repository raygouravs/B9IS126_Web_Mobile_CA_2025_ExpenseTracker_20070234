/*
    REFERENCE: Ionic (2025) ION LIST UI Component. Available at: https://ionicframework.com/docs/api/list
*/

import { IonList, IonItem, IonLabel, IonContent, IonIcon } from '@ionic/react';
import { Entry } from '../models/Entry';
import { addOutline, removeOutline } from 'ionicons/icons';

export default function EntryListView(props: { entries: Entry[] }) {
  return (
    <IonContent color="light">
    <IonList inset={true}>
    {props.entries.map((e) => (
    <IonItem 
      key={e.id}
      style={{
        '--background': e.type === 'income' 
          ? 'rgba(45, 211, 111, 0.5)'
          : 'rgba(235, 68, 90, 0.5)'
      } as React.CSSProperties}>
      <IonIcon 
        slot="start"
        icon={e.type === 'income' ? addOutline : removeOutline }
        style={{ fontSize: 24, color: e.type === 'income' ? '#2dd36f' : '#eb445a'}}
      />
      <IonLabel>
        <h2>{e.type.toUpperCase()} - ₹{e.amount}</h2>
        <p>{e.date}</p>
        <p>{e.expense_category || e.income_source}</p>
      </IonLabel>
    </IonItem>
    ))}
    </IonList>
    </IonContent>
  );
}


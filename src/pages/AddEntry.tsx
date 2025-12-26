/*
    REFERENCE: Ionic (2025) IonSelect UI Component. Available at: https://ionicframework.com/docs/api/select
*/
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonInput, IonButton, IonSelect,
  IonSelectOption, IonLabel, useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DiskStorageService } from '../services/DiskStorageService';
import { VibrationService } from '../services/VibrationService';

export default function AddEntry({ history }: any) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const ionRouter = useIonRouter();

  async function save() {
    if(amount === 0){
        window.alert('Please enter an amount!');
        return;
    }
    if(type === 'income' && source === ''){
        window.alert('Please enter a source!');
        return;
    }
    if(type === 'expense' && category === ''){
        window.alert('Please enter a category!');
        return;
    }
    let new_entry = {
      id: `${uuid()}-${new Date().toISOString()}`,
      type,
      date: new Date().toISOString().split('T')[0],
      amount,
      expense_category: category,
      income_source: source
    };
    await DiskStorageService.saveEntry(new_entry);
    VibrationService.vibrate();
    let updated = await DiskStorageService.loadEntries();
    window.dispatchEvent(
        new CustomEvent('entries:updated', { detail: updated })
    );
    ionRouter.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLabel>Select Entry Type:</IonLabel>
        <IonSelect value={type} onIonChange={e => setType(e.detail.value)}>
          <IonSelectOption value="expense">Expense</IonSelectOption>
          <IonSelectOption value="income">Income</IonSelectOption>
        </IonSelect>

        <IonLabel>€</IonLabel>
        <IonInput
          type="number"
          placeholder="Amount"
          onIonChange={e => setAmount(Number(e.detail.value))}
        />

        {type === 'expense' && (
          <IonInput key="expense_category" placeholder="Category" value={category} onIonInput={e => setCategory(e.detail.value!)} />
        )}

        {type === 'income' && (
          <IonInput key="income_source" placeholder="Source" value={source} onIonInput={e => setSource(e.detail.value!)} />
        )}
        
        {/*
        {type === 'expense' ? 
        <IonInput placeholder="Category" onIonChange={e => setCategory(e.detail.value!)} /> : 
        <IonInput placeholder="Source" onIonChange={e => setSource(e.detail.value!)} 
        />
        */}

        <IonButton expand="block" onClick={save} color='warning'>Save</IonButton>
      </IonContent>
    </IonPage>
  );
}

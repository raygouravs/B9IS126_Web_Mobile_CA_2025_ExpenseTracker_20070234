/*
    REFERENCE: 
    Ionic (2025) ION LIST UI Component. Available at: https://ionicframework.com/docs/api/list
    Ionic (2025) IonItemSliding UI Component. Available at: https://ionicframework.com/docs/api/item-sliding
*/

import { 
  IonList, IonItemSliding, IonLabel, IonIcon, 
  IonItemOptions, IonItemOption, IonItem 
} from '@ionic/react';
import { Entry } from '../models/Entry';
import { addOutline, removeOutline, trash } from 'ionicons/icons';
import { DiskStorageService } from '../services/DiskStorageService';

const formatDateString = (dateString: string) => {
    const dateStr = dateString;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [year, month, day] = dateStr.split("-");
    const customFormat = `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
    console.log(customFormat); // Output: "Dec 25, 2025"
    return customFormat;
}

export default function EntryListView(props: { entries: Entry[], setEntries: any }) {

  const handleDelete = async (id: string) => {
    let up_entries = props.entries.filter(e => e.id !== id);
    await DiskStorageService.saveEntries(up_entries);
    props.setEntries(up_entries);
  };

  return (
    <IonList inset={true} style={{ background: 'transparent' }}>
      {props.entries.map((e) => (
        <IonItemSliding key={e.id}>
          <IonItem 
            style={{
              '--background': e.type === 'income' 
                ? 'rgba(45, 211, 111, 0.15)'
                : 'rgba(235, 68, 90, 0.15)',
              '--border-radius': '12px',
              '--inner-padding-bottom': '10px',
              '--inner-padding-top': '10px',
              'margin-bottom': '10px'
            } as React.CSSProperties}
            lines="none"
          >
            <IonIcon 
              slot="start"
              icon={e.type === 'income' ? addOutline : removeOutline }
              style={{ fontSize: 24, color: e.type === 'income' ? '#2dd36f' : '#eb445a'}}
            />
             <IonLabel className="ion-text-wrap" style={{ display: 'block' }}>
              <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '4px' }}>
                {formatDateString(e.date)}
              </p>
              
              <h2 style={{ fontWeight: '700', color: '#000', fontSize: '1.1rem', marginBottom: '4px' }}>
                {e.type.toUpperCase()} — €{e.amount}
              </h2>

              {e.expense_category && (
                <p style={{ color: '#333', fontSize: '0.95rem', opacity: 1 }}>
                  <b>Category:</b> {e.expense_category}
                </p>
              )}
              
              {e.income_source && (
                <p style={{ color: '#333', fontSize: '0.95rem', opacity: 1 }}>
                  <b>Source:</b> {e.income_source}
                </p>
              )}
            </IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption color="danger" onClick={() => handleDelete(e.id)}>
              <IonIcon slot="icon-only" icon={trash} />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  );
}
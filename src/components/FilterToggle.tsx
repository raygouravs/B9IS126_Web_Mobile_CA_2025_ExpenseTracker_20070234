/*
    REFERENCE: Ionic (2025) Segment UI Component. Available at: https://ionicframework.com/docs/api/segment
*/

import React from 'react';
import { IonLabel, IonSegment, IonSegmentButton, SegmentChangeEventDetail } from '@ionic/react';
import { filter } from 'ionicons/icons';

function FilterToggle(props: { value: string, onChange: any }) {

   const handleSegmentChange = (e: CustomEvent<SegmentChangeEventDetail>) => {
     e.stopPropagation();
     const selectedValue = e.detail.value as string;
     props.onChange(selectedValue);
  };

  return (
    <>
      <IonSegment mode='ios' value={props.value} onIonChange={handleSegmentChange}>
        <IonSegmentButton value="expense">
          <IonLabel>Expense</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="income">
          <IonLabel>Income</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="all">
          <IonLabel>All</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </>
  );
}
export default FilterToggle;
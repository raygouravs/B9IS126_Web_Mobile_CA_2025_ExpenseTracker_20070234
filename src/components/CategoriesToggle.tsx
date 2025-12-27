/*
    REFERENCE: Ionic (2025) Segment UI Component. Available at: https://ionicframework.com/docs/api/segment
*/

import React from 'react';
import { IonLabel, IonSegment, IonSegmentButton, SegmentChangeEventDetail } from '@ionic/react';


function CategoriesToggle(props: { value: string, onChange: any }) {

   const handleSegmentChange = (e: CustomEvent<SegmentChangeEventDetail>) => {
     e.stopPropagation();
     const selectedValue = e.detail.value as string;
     props.onChange(selectedValue);
  };

  return (
    <>
      <IonSegment mode='ios' value={props.value} onIonChange={handleSegmentChange}>
        <IonSegmentButton value="expenses">
          <IonLabel>Expenses</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="income">
          <IonLabel>Income</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </>
  );
}
export default CategoriesToggle;
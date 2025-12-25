/*
    REFERENCE: Ionic (2025) Segment UI Component. Available at: https://ionicframework.com/docs/api/segment
*/

import React from 'react';
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';

function Example() {
  return (
    <>
      <IonSegment color="filter" value="filter">
         <IonSegmentButton value="all">
          <IonLabel>All</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="expense">
          <IonLabel>Expense</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="income">
          <IonLabel>Income</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </>
  );
}
export default Example;
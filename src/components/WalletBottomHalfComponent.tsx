import React from 'react';
import { IonContent, IonIcon, IonLabel, IonSegment, IonSegmentButton, SegmentChangeEventDetail } from '@ionic/react';
import { useState } from 'react';
import CategoriesToggle from './CategoriesToggle';

function WalletBottomHalfComponent() {

  const [filter, setFilter] = useState('expenses');

  return (
    <>
      <CategoriesToggle value={filter} onChange={setFilter} />
    </>
  );
}

export default WalletBottomHalfComponent;
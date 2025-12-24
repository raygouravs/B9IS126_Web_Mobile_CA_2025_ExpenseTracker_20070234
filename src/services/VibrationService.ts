/*
    REFERENCE: Ionic (2025) Haptics Capacitor Plugin API. Available at: https://ionicframework.com/docs/native/haptics
*/

import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const VibrationService = {
  vibrate() {
    Haptics.impact({ style: ImpactStyle.Medium });
  },
};

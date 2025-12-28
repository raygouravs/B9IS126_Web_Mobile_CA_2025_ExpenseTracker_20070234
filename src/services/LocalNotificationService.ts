/*
    REFERENCE: Ionic (2025) Local Notifications Native Plugin, docs Available at: https://ionicframework.com/docs/native/local-notifications
*/

import { LocalNotifications } from "@capacitor/local-notifications";
import { showToast } from "../utils/utilitymethods";

export default class LocalNotificationService {

    static async checkNotificationPermission(): Promise<boolean> {
        const permissionStatus = await LocalNotifications.checkPermissions();
        return permissionStatus.display === 'granted';
    }

    static async requestNotificationPermission(): Promise<boolean> {
        const permissionStatus = await LocalNotifications.requestPermissions();
        return permissionStatus.display === 'granted';
    }

    static checkAndRequestNotificationPermissions = async () => {
        const hasPermission = await LocalNotificationService.checkNotificationPermission();
        if (!hasPermission) {
            const granted = await LocalNotificationService.requestNotificationPermission();
            if (!granted) {
                window.alert('Please enable notifications for this app from Settings!')
            }
        }
   }

    static scheduleReminder = async (description: string, notificationFireDate: string) => {
        try {

            const hasPermission = await LocalNotificationService.checkNotificationPermission();
            if (!hasPermission) {
                showToast('Please enable notifications for this app from Settings!', 'long');
                return;
            }

            const now = new Date();

            if (new Date(notificationFireDate) <= now) {
                showToast('The reminder date has already passed, skipping notification.', 'short');
                return; 
            }

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: "Alert! Upcoming Transaction...",
                        body: `Reminder: ${description} is due tomorrow!`,
                        id: Math.floor(Math.random() * 1000000), 
                        channelId: 'budget_alerts_high_v3',
                        schedule: { 
                            at: new Date(notificationFireDate),
                            allowWhileIdle: true
                        },
                        sound: 'default',
                        actionTypeId: "",
                        extra: null
                    }
                ]
            });

            showToast(`Notification scheduled successfully for: ${notificationFireDate}`, 'short');

        } catch (error) {
            console.error("Error in scheduling reminder:", error);
            showToast("Error in scheduling reminder!", 'short');
        }
    }

    static budgetNotification = async () => {
        await LocalNotifications.schedule({
                notifications: [
                {
                    title: "Budget Alert! ⚠️",
                    body: `You have reached your monthly budget limit of this month!`,
                    id: 999,
                    channelId: 'budget_alerts_high_v3',
                    schedule: { at: new Date(Date.now() + 1000) },
                    sound: 'default',
                    extra: null
                }
                ]
        }); 
    }

    static createNotificationChannel = async () => {
      await LocalNotifications.createChannel({
        id: 'budget_alerts_high_v3',
        name: 'Budget & Reminders',
        description: 'Critical alerts for budget limits',
        importance: 5,
        visibility: 1,
        sound: 'default',
        vibration: true,
      });
    };
}




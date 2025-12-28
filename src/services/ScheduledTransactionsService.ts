/*
    REFERENCE: Ionic (2025) Preferences Capacitor Plugin. Available at: https://capacitorjs.com/docs/apis/preferences
*/
import { Preferences } from '@capacitor/preferences';
import { RecurringSchedule, RecurrencePeriod } from '../models/RecurringEntry';
import { MonthlyBudget, showToast } from '../utils/utilitymethods';
import LocalNotificationService from '../services/LocalNotificationService';

const SCHEDULE_KEY = 'recurring_transactions';
const BUDGET_KEY_PREFIX = 'budget_'; // 'bugdet_2025_12'

export default class ScheduledTransactionsService {

    private static budgetKeyGen = (budget: MonthlyBudget) => {
        return `${BUDGET_KEY_PREFIX}${budget.year}_${budget.month}`;
    }

    static async loadSchedules(): Promise<RecurringSchedule[]> {
        const { value } = await Preferences.get({ key: SCHEDULE_KEY });
        return value ? JSON.parse(value) : [];
    }

    static saveSchedule = async (schedule: RecurringSchedule) => {
        const schedules = await this.loadSchedules();
        schedules.push(schedule);
        await Preferences.set({
            key: SCHEDULE_KEY,
            value: JSON.stringify(schedules)
        });
    }

    static deleteSchedule = async (id: string) => {
        const schedules = await this.loadSchedules();
        const filteredSchedules = schedules.filter(s => s.id !== id);
        await Preferences.set({
            key: SCHEDULE_KEY,
            value: JSON.stringify(filteredSchedules)
        });
        const notif_id_to_delete = this.getNotificationIDBySchedID(id);
        await LocalNotificationService.cancelNotification(Number(notif_id_to_delete));
        showToast('Scheduled transaction deleted successfully!', 'short');
    }

    //setting screen budget tracker
    static updateMonthlyBudget = async (budget: MonthlyBudget) => {
        const budget_key = this.budgetKeyGen(budget);
        const { value } = await Preferences.get({ key: budget_key}); 
        let mbudget = value ? JSON.parse(value) : {amount: 0, month: budget.month, year: budget.year};
        mbudget.amount = budget.amount;
        await Preferences.set({
            key: budget_key,
            value: JSON.stringify(mbudget)
        });
    }

    //setting screen budget tracker
    static getMonthlyBudget = async (budget: MonthlyBudget): Promise<MonthlyBudget> => {
        const budget_key = this.budgetKeyGen(budget);
        const { value } = await Preferences.get({ key: budget_key});
        return value ? JSON.parse(value) : {amount: 0, month: budget.month, year: budget.year};
    }

    //store notification IDs
    static saveNotificationID = async (schedID:string, notID:number) => {
        await Preferences.set({
            key: schedID,
            value: String(notID)
        });
    }

    //fetch notification ID
    static getNotificationIDBySchedID = async (schedID:string): Promise<string> => {
        const { value } = await Preferences.get({ key: schedID });
        return value ?? '000';
    }
}


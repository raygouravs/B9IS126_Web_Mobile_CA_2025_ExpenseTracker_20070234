
export class UtilityMethods {
    static getCurrentMonth = () => {
        const todaysDate: string = new Date().toISOString().split('T')[0];
        // "2025-12-26"
        const parts: string[] = todaysDate.split("-");
        const MM = Number(parts[1]);
        return MM;
    }
}

export interface MonthlyStats {
  expense: number,
  income: number
}
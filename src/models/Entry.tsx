
export type EntryType = 'income' | 'expense';

export interface Entry {
  id: string;
  type: EntryType;
  date: string; // YYYY-MM-DD
  amount: number;
  expense_category?: string;
  income_source?: string;
  description: string;
  timestamp: number;
}



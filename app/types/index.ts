export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Dining'
  | 'Groceries'
  | 'Transport'
  | 'Utilities'
  | 'Shopping'
  | 'Entertainment'
  | 'Health'
  | 'Travel'
  | 'Housing'
  | 'Education'
  | 'Other';

export interface Transaction {
  id: string;
  date: string; // ISO 8601 e.g. "2025-03-15"
  amount: number; // always positive
  type: TransactionType;
  category: Category;
  description: string;
  merchant: string;
}

export type Role = 'admin' | 'viewer';

export interface KpiData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}

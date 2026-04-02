'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, Role } from '../types';
import { MOCK_TRANSACTIONS } from '../data/transactions';

interface FinanceStore {
  transactions: Transaction[];
  role: Role;

  // Role
  setRole: (role: Role) => void;

  // CRUD
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  deleteTransaction: (id: string) => void;
}

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set) => ({
      transactions: MOCK_TRANSACTIONS,
      role: 'viewer',

      setRole: (role) => set({ role }),

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [
            {
              ...tx,
              id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            },
            ...state.transactions,
          ],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
    }),
    {
      name: 'clerio-finance-store',
    }
  )
);

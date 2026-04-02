'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, DollarSign, Tag, Calendar, FileText, Store, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import type { Transaction, Category, TransactionType } from '../../types';

const CATEGORIES: Category[] = [
  'Salary', 'Freelance', 'Investment',
  'Dining', 'Groceries', 'Transport', 'Utilities',
  'Shopping', 'Entertainment', 'Health', 'Travel',
  'Housing', 'Education', 'Other',
];

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** If provided, the modal is in "edit" mode */
  transaction?: Transaction | null;
}

interface FormState {
  amount: string;
  type: TransactionType;
  category: Category;
  date: string;
  description: string;
  merchant: string;
}

interface FormErrors {
  amount?: string;
  date?: string;
  description?: string;
  merchant?: string;
}

const today = () => new Date().toISOString().split('T')[0];

const defaultForm = (): FormState => ({
  amount: '',
  type: 'expense',
  category: 'Other',
  date: today(),
  description: '',
  merchant: '',
});

export default function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { addTransaction, editTransaction } = useFinanceStore();
  const isEditing = !!transaction;

  const [form, setForm] = useState<FormState>(defaultForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (transaction) {
      setForm({
        amount: String(transaction.amount),
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
        description: transaction.description,
        merchant: transaction.merchant,
      });
    } else {
      setForm(defaultForm());
    }
    setErrors({});
  }, [transaction, isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};
    const amt = parseFloat(form.amount);

    if (!form.amount || isNaN(amt) || amt <= 0) {
      errs.amount = 'Enter a valid positive amount.';
    }
    if (!form.date) {
      errs.date = 'Date is required.';
    } else if (form.date > today()) {
      errs.date = 'Date cannot be in the future.';
    }
    if (!form.description.trim()) {
      errs.description = 'Description is required.';
    } else if (form.description.length > 80) {
      errs.description = 'Max 80 characters.';
    }
    if (!form.merchant.trim()) {
      errs.merchant = 'Merchant / source is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      description: form.description.trim(),
      merchant: form.merchant.trim(),
    };

    // Small artificial delay so the submit feels intentional
    await new Promise((r) => setTimeout(r, 300));

    if (isEditing && transaction) {
      editTransaction(transaction.id, payload);
    } else {
      addTransaction(payload);
    }

    setSubmitting(false);
    onClose();
  };

  const field = (key: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((p) => ({ ...p, [key]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Blur + dim overlay */}
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />

      {/* Modal panel */}
      <div className="relative w-full max-w-lg glass-card rounded-3xl shadow-2xl shadow-blue-900/10 border border-white/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/20">
          <div>
            <h2 className="font-black text-xl text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              {isEditing ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {isEditing ? 'Update the details below.' : 'Fill in the details to log a new entry.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-on-surface-variant hover:bg-white/50 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Type Toggle */}
          <div className="flex rounded-full bg-surface-container-low p-1 border border-outline-variant/10">
            {(['expense', 'income'] as TransactionType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => field('type', t)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  form.type === t
                    ? t === 'expense'
                      ? 'bg-error text-white shadow-sm'
                      : 'bg-tertiary text-white shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {t === 'expense' ? <ArrowUpCircle size={13} /> : <ArrowDownCircle size={13} />}
                {t}
              </button>
            ))}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5">
              Amount
            </label>
            <div className="relative">
              <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={(e) => field('amount', e.target.value)}
                placeholder="0.00"
                className={`w-full pl-9 pr-4 py-3 rounded-xl bg-white/60 border text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                  errors.amount ? 'border-error/60 bg-error/5' : 'border-white/40'
                }`}
              />
            </div>
            {errors.amount && (
              <p className="text-[11px] text-error mt-1 font-medium">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5">
              Category
            </label>
            <div className="relative">
              <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
              <select
                value={form.category}
                onChange={(e) => field('category', e.target.value as Category)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/60 border border-white/40 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5">
              Date
            </label>
            <div className="relative">
              <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
              <input
                type="date"
                value={form.date}
                max={today()}
                onChange={(e) => field('date', e.target.value)}
                className={`w-full pl-9 pr-4 py-3 rounded-xl bg-white/60 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                  errors.date ? 'border-error/60 bg-error/5' : 'border-white/40'
                }`}
              />
            </div>
            {errors.date && (
              <p className="text-[11px] text-error mt-1 font-medium">{errors.date}</p>
            )}
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5">
              Merchant / Source
            </label>
            <div className="relative">
              <Store size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
              <input
                type="text"
                value={form.merchant}
                onChange={(e) => field('merchant', e.target.value)}
                placeholder="e.g. Apple Store, Stripe"
                className={`w-full pl-9 pr-4 py-3 rounded-xl bg-white/60 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                  errors.merchant ? 'border-error/60 bg-error/5' : 'border-white/40'
                }`}
              />
            </div>
            {errors.merchant && (
              <p className="text-[11px] text-error mt-1 font-medium">{errors.merchant}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1.5">
              Description
              <span className={`ml-2 font-normal normal-case tracking-normal ${form.description.length > 80 ? 'text-error' : 'text-on-surface-variant/50'}`}>
                {form.description.length}/80
              </span>
            </label>
            <div className="relative">
              <FileText size={15} className="absolute left-3.5 top-3.5 text-on-surface-variant/50" />
              <textarea
                value={form.description}
                onChange={(e) => field('description', e.target.value)}
                placeholder="Short description of this transaction…"
                rows={2}
                className={`w-full pl-9 pr-4 py-3 rounded-xl bg-white/60 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none ${
                  errors.description ? 'border-error/60 bg-error/5' : 'border-white/40'
                }`}
              />
            </div>
            {errors.description && (
              <p className="text-[11px] text-error mt-1 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-slate-200 text-slate-600 text-sm font-bold hover:bg-white/60 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 py-3 rounded-full text-white text-sm font-bold shadow-lg transition-all active:scale-[0.98] ${
                form.type === 'expense'
                  ? 'bg-error shadow-error/20 hover:opacity-90'
                  : 'bg-tertiary shadow-tertiary/20 hover:opacity-90'
              } ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Saving…' : isEditing ? 'Update' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronLeft, ChevronRight, Plus, 
  ArrowUpDown, Edit, Trash2, Utensils, Car, ShoppingBag, 
  Tv, Zap, Building, Dumbbell, Plane, Briefcase, 
  TrendingUp, Home, BookOpen, CircleDot, Globe, ShoppingCart, DollarSign
} from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import CategoryBadge from '../components/ui/CategoryBadge';
import TransactionModal from '../components/ui/TransactionModal';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Transaction, Category, TransactionType } from '../types';

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  Salary: Briefcase,
  Freelance: Globe,
  Investment: TrendingUp,
  Dining: Utensils,
  Groceries: ShoppingBag,
  Transport: Car,
  Utilities: Zap,
  Shopping: ShoppingCart,
  Entertainment: Tv,
  Health: Dumbbell,
  Travel: Plane,
  Housing: Home,
  Education: BookOpen,
  Other: CircleDot,
};

const CATEGORIES: Category[] = [
  'Salary', 'Freelance', 'Investment',
  'Dining', 'Groceries', 'Transport', 'Utilities',
  'Shopping', 'Entertainment', 'Health', 'Travel',
  'Housing', 'Education', 'Other',
];

export default function TransactionsPage() {
  const { transactions, role, deleteTransaction } = useFinanceStore();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Category>('all');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  // Sort State
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // Reset page on new search
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, categoryFilter, dateStart, dateEnd]);

  // Filtering & Sorting Logic
  const filteredAndSorted = useMemo(() => {
    // 1. Filter
    let result = transactions.filter((tx) => {
      // Search
      const lowerSearch = debouncedSearch.toLowerCase();
      if (
        lowerSearch && 
        !tx.description.toLowerCase().includes(lowerSearch) && 
        !tx.merchant.toLowerCase().includes(lowerSearch) &&
        !tx.category.toLowerCase().includes(lowerSearch)
      ) {
        return false;
      }
      // Type
      if (typeFilter !== 'all' && tx.type !== typeFilter) return false;
      // Category
      if (categoryFilter !== 'all' && tx.category !== categoryFilter) return false;
      // Date Range
      if (dateStart && tx.date < dateStart) return false;
      if (dateEnd && tx.date > dateEnd) return false;

      return true;
    });

    // 2. Sort
    result.sort((a, b) => {
      if (sortField === 'date') {
        const dateComp = new Date(b.date).getTime() - new Date(a.date).getTime();
        return sortDirection === 'desc' ? dateComp : -dateComp;
      } else {
        const valA = a.amount;
        const valB = b.amount;
        return sortDirection === 'desc' ? valB - valA : valA - valB;
      }
    });

    return result;
  }, [transactions, debouncedSearch, typeFilter, categoryFilter, dateStart, dateEnd, sortField, sortDirection]);

  // 3. Paginate
  const totalItems = filteredAndSorted.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAndSorted.slice(start, start + rowsPerPage);
  }, [filteredAndSorted, currentPage, rowsPerPage]);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleAddNew = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: '2-digit', year: 'numeric'
    }).format(new Date(dateStr));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD'
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="pt-8 px-6 pb-20 max-w-7xl mx-auto">
        {/* Header Section */}
      <section className="mb-12 relative flex justify-between items-end">
        <div className="absolute -top-24 -right-12 w-64 h-64 bg-primary-container/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-0 -left-12 w-48 h-48 bg-tertiary-container/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div>
          <h1 className="font-bold text-5xl tracking-tight text-on-surface mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>Transactions</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">Review and manage your curated financial records.</p>
        </div>

        {/* Admin Add Button - Desktop */}
        {role === 'admin' && (
          <button 
            onClick={handleAddNew}
            className="hidden md:flex px-6 py-3 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 items-center gap-2 hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        )}
      </section>

      {/* Filters Bento Section */}
      <div className="glass-card rounded-2xl p-6 mb-8 bevel-reflection border border-white/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..." 
              className="w-full pl-12 pr-4 py-3 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm placeholder:text-on-surface-variant/40"
            />
          </div>

          {/* Type Filter */}
          <div className="md:col-span-2">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div className="md:col-span-2 relative group">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/50 border-none rounded-2xl font-medium text-sm focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Date Range */}
          <div className="md:col-span-3 flex gap-2">
            <input 
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              className="w-full px-3 py-3 bg-white/50 border-none rounded-2xl font-medium text-xs focus:ring-2 focus:ring-primary/20" 
            />
            <input 
              type="date" 
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              className="w-full px-3 py-3 bg-white/50 border-none rounded-2xl font-medium text-xs focus:ring-2 focus:ring-primary/20" 
            />
          </div>

          {/* Sort Reset/Action */}
          <div className="md:col-span-1">
            <button 
              onClick={() => toggleSort('date')}
              className="w-full h-full flex items-center justify-center bg-white/50 rounded-2xl hover:bg-white transition-colors"
              title="Sort by Date"
            >
              <ArrowUpDown className="text-on-surface-variant" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="glass-card rounded-2xl overflow-hidden bevel-reflection border border-white/40">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/20">
                <th 
                  className="cursor-pointer px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 border-b border-white/10 hover:text-on-surface transition-colors"
                  onClick={() => toggleSort('date')}
                >
                  <div className="flex items-center gap-1">
                    Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 border-b border-white/10">Description</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 border-b border-white/10">Category</th>
                <th 
                  className="cursor-pointer px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 border-b border-white/10 text-right hover:text-on-surface transition-colors"
                  onClick={() => toggleSort('amount')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Amount {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </div>
                </th>
                {role === 'admin' && (
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 border-b border-white/10 text-center">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={role === 'admin' ? 5 : 4} className="px-8 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-on-surface-variant/60">
                      <Search size={40} className="mb-4 opacity-50" />
                      <p className="font-bold text-lg">No transactions found</p>
                      <p className="text-sm">Try modifying your filters or search term.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((tx) => {
                  const Icon = CATEGORY_ICONS[tx.category] || CATEGORY_ICONS.Other;
                  return (
                    <tr key={tx.id} className="hover:bg-white/30 transition-colors group">
                      <td className="px-8 py-6 font-medium text-sm text-on-surface-variant whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${
                            tx.type === 'income' ? 'bg-tertiary/10 text-tertiary' : 'bg-surface-container-high text-on-surface-variant'
                          }`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div className="font-bold text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
                              {tx.merchant}
                            </div>
                            <div className="text-xs text-on-surface-variant/70 mt-0.5 truncate max-w-[200px] md:max-w-[300px]">
                              {tx.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <CategoryBadge category={tx.category} />
                      </td>
                      <td className={`px-8 py-6 text-right font-extrabold whitespace-nowrap ${
                        tx.type === 'income' ? 'text-tertiary' : 'text-error'
                      }`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                      {role === 'admin' && (
                        <td className="px-8 py-6">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(tx)}
                              className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-white/20 rounded-lg hover:bg-white"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(tx.id)}
                              className="p-2 text-on-surface-variant hover:text-error transition-colors bg-white/20 rounded-lg hover:bg-white"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 bg-white/10 gap-4 sm:gap-0">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-on-surface-variant">
                Showing {Math.min((currentPage - 1) * rowsPerPage + 1, totalItems)} - {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems} results
              </span>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-on-surface-variant/60 font-bold uppercase tracking-widest">Rows:</span>
                <select 
                  value={rowsPerPage} 
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer p-0 pr-4"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant bg-white/20 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center">
                {/* Simplified page numbers for brevity */}
                <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-on-primary">
                  {currentPage}
                </span>
                <span className="px-2 text-on-surface-variant/50 text-sm">of {totalPages}</span>
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant bg-white/20 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FAB Add Button - Mobile/Floating */}
      {role === 'admin' && (
        <button 
          onClick={handleAddNew}
          className="md:hidden fixed bottom-10 right-6 w-14 h-14 bg-linear-to-br from-primary to-primary-container text-on-primary rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-40"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Admin Add/Edit Modal */}
      <TransactionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={editingTx}
      />
      </div>
    </DashboardLayout>
  );
}

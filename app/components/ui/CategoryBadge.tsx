import type { Category } from '../../types';

const CATEGORY_STYLES: Record<
  Category,
  { bg: string; text: string; dot: string }
> = {
  Salary:        { bg: 'bg-tertiary/10',            text: 'text-tertiary',          dot: 'bg-tertiary' },
  Freelance:     { bg: 'bg-blue-100',               text: 'text-blue-700',          dot: 'bg-blue-500' },
  Investment:    { bg: 'bg-indigo-100',             text: 'text-indigo-700',        dot: 'bg-indigo-500' },
  Dining:        { bg: 'bg-secondary-container',    text: 'text-on-secondary-container', dot: 'bg-secondary' },
  Groceries:     { bg: 'bg-yellow-100',             text: 'text-yellow-800',        dot: 'bg-yellow-500' },
  Transport:     { bg: 'bg-primary/10',             text: 'text-primary',           dot: 'bg-primary' },
  Utilities:     { bg: 'bg-green-100',              text: 'text-green-700',         dot: 'bg-green-500' },
  Shopping:      { bg: 'bg-slate-200',              text: 'text-slate-700',         dot: 'bg-slate-500' },
  Entertainment: { bg: 'bg-purple-100',             text: 'text-purple-700',        dot: 'bg-purple-500' },
  Health:        { bg: 'bg-red-100',                text: 'text-red-700',           dot: 'bg-red-500' },
  Travel:        { bg: 'bg-orange-100',             text: 'text-orange-700',        dot: 'bg-orange-500' },
  Housing:       { bg: 'bg-error-container/20',     text: 'text-error',             dot: 'bg-error' },
  Education:     { bg: 'bg-cyan-100',               text: 'text-cyan-700',          dot: 'bg-cyan-500' },
  Other:         { bg: 'bg-surface-container-high', text: 'text-on-surface-variant', dot: 'bg-outline' },
};

interface CategoryBadgeProps {
  category: Category;
  showDot?: boolean;
  size?: 'sm' | 'md';
}

export default function CategoryBadge({
  category,
  showDot = false,
  size = 'md',
}: CategoryBadgeProps) {
  const styles = CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Other;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-tighter
        ${size === 'sm' ? 'px-2.5 py-0.5 text-[9px]' : 'px-3.5 py-1 text-[10px]'}
        ${styles.bg} ${styles.text}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`} />
      )}
      {category}
    </span>
  );
}

/** Export the raw styles map so charts / legends can reuse the dot color */
export { CATEGORY_STYLES };

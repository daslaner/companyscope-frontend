import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }>;

export function Button({ variant = 'primary', className, children, ...props }: Props) {
  return <button className={clsx('inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition duration-150 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50', variant === 'primary' && 'bg-violet-600 text-white shadow-sm hover:bg-violet-700', variant === 'secondary' && 'border border-violet-200 bg-white/80 text-slate-900 hover:border-violet-300 hover:bg-violet-50 dark:border-violet-900 dark:bg-slate-900 dark:text-white dark:hover:bg-violet-950/30', variant === 'ghost' && 'text-slate-700 hover:bg-violet-50 dark:text-slate-200 dark:hover:bg-violet-950/30', variant === 'danger' && 'bg-rose-700 text-white hover:bg-rose-800', className)} {...props}>{children}</button>;
}

import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';
export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div className={clsx('rounded-[1.5rem] border border-violet-100/90 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-violet-950 dark:bg-slate-950/85', className)} {...props}>{children}</div>;
}

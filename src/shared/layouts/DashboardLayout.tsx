import type { ReactNode } from 'react';
import { Header } from '@/shared/components/Header';
import { Sidebar } from '@/shared/components/Sidebar';

interface DashboardLayoutProps {
  activeNav: number;
  children: ReactNode;
  className?: string;
}

export function DashboardLayout({ activeNav, children, className = '' }: DashboardLayoutProps) {
  return (
    <>
      <Header />
      <Sidebar activeNav={activeNav} />
      <div className={`content ${className}`.trim()}>{children}</div>
    </>
  );
}

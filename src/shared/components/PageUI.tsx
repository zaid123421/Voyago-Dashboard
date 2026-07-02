import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { ConfirmModal } from './Modal';

export function useConfirmDialog() {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    resolve?: (value: boolean) => void;
  }>({ open: false, title: '', message: '', confirmLabel: 'Delete' });

  const confirm = (
    title: string,
    message: string,
    confirmLabel = 'Delete',
  ): Promise<boolean> =>
    new Promise((resolve) => {
      setState({ open: true, title, message, confirmLabel, resolve });
    });

  const dialog = (
    <ConfirmModal
      open={state.open}
      title={state.title}
      message={state.message}
      confirmLabel={state.confirmLabel}
      onConfirm={() => {
        state.resolve?.(true);
        setState((s) => ({ ...s, open: false, resolve: undefined }));
      }}
      onCancel={() => {
        state.resolve?.(false);
        setState((s) => ({ ...s, open: false, resolve: undefined }));
      }}
    />
  );

  return { confirm, dialog };
}

interface PageHeaderProps {
  title: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  action?: ReactNode;
}

export function PageHeader({ title, search, onSearchChange, action }: PageHeaderProps) {
  return (
    <div className="d-flex align-c page-header-row">
      <h1 className="special-head">{title}</h1>
      {onSearchChange !== undefined && (
        <div className="d-flex align-c ml-50 search-box">
          <label htmlFor="search">
            <i className="search-icon fa-solid fa-magnifying-glass position-relative" />
          </label>
          <input
            id="search"
            className="special-search"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}
      {action}
    </div>
  );
}

export function FloatingAddLink({ to }: { to: string }) {
  return (
    <NavLink className="floating-button" to={to}>
      +
    </NavLink>
  );
}

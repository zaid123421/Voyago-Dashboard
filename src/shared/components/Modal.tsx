import { createPortal } from 'react-dom';
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'image';
  showClose?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  title,
  size = 'md',
  showClose = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="voyago-modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`voyago-modal voyago-modal--${size}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {(title || showClose) && (
          <div className="voyago-modal__header">
            {title && <h3 className="voyago-modal__title">{title}</h3>}
            {showClose && (
              <button type="button" className="voyago-modal__close" onClick={onClose} aria-label="Close">
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
        )}
        <div className="voyago-modal__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onCancel} title={title} size="sm">
      <p className="voyago-modal__message">{message}</p>
      <div className="voyago-modal__actions">
        <button type="button" className="voyago-btn voyago-btn--ghost" onClick={onCancel}>
          {cancelLabel}
        </button>
        <button
          type="button"
          className={`voyago-btn ${variant === 'danger' ? 'voyago-btn--danger' : 'voyago-btn--primary'}`}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

interface ImagePreviewModalProps {
  open: boolean;
  src: string | null;
  alt?: string;
  onClose: () => void;
}

export function ImagePreviewModal({ open, src, alt = 'Preview', onClose }: ImagePreviewModalProps) {
  return (
    <Modal open={open && Boolean(src)} onClose={onClose} title="Receipt Preview" size="image">
      {src && <img src={src} alt={alt} className="voyago-modal__image" loading="lazy" />}
    </Modal>
  );
}

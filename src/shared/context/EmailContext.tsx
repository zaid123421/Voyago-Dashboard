import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const EMAIL_KEY = 'resetEmail';
const CODE_KEY = 'verificationCode';

interface EmailContextValue {
  email: string;
  verificationCode: number;
  setEmail: (email: string) => void;
  setVerificationCode: (code: number) => void;
  clearResetFlow: () => void;
}

const EmailContext = createContext<EmailContextValue | null>(null);

function readStoredEmail() {
  return sessionStorage.getItem(EMAIL_KEY) ?? '';
}

function readStoredCode() {
  const raw = sessionStorage.getItem(CODE_KEY);
  return raw ? Number(raw) : 0;
}

export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState(readStoredEmail);
  const [verificationCode, setCodeState] = useState(readStoredCode);

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
    if (value) sessionStorage.setItem(EMAIL_KEY, value);
    else sessionStorage.removeItem(EMAIL_KEY);
  }, []);

  const setVerificationCode = useCallback((code: number) => {
    setCodeState(code);
    if (code) sessionStorage.setItem(CODE_KEY, String(code));
    else sessionStorage.removeItem(CODE_KEY);
  }, []);

  const clearResetFlow = useCallback(() => {
    setEmailState('');
    setCodeState(0);
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(CODE_KEY);
  }, []);

  const value = useMemo(
    () => ({ email, verificationCode, setEmail, setVerificationCode, clearResetFlow }),
    [email, verificationCode, setEmail, setVerificationCode, clearResetFlow],
  );

  return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>;
}

export function useEmail() {
  const ctx = useContext(EmailContext);
  if (!ctx) throw new Error('useEmail must be used within EmailProvider');
  return ctx;
}

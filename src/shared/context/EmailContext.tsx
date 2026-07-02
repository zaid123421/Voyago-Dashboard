import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

interface EmailContextValue {
  email: string;
  setEmail: (email: string) => void;
}

const EmailContext = createContext<EmailContextValue | null>(null);

export function EmailProvider({ children }: { children: ReactNode }) {
  const [email, setEmailState] = useState('');

  const setEmail = useCallback((e: string) => setEmailState(e), []);

  const value = useMemo(() => ({ email, setEmail }), [email, setEmail]);

  return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>;
}

export function useEmail() {
  const ctx = useContext(EmailContext);
  if (!ctx) throw new Error('useEmail must be used within EmailProvider');
  return ctx;
}

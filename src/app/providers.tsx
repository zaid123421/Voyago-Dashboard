import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/shared/context/AuthContext';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { EmailProvider } from '@/shared/context/EmailContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <EmailProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: 'var(--cards-color)',
                  color: 'var(--font-color)',
                  border: '1px solid rgba(160, 77, 246, 0.35)',
                  borderRadius: '12px',
                },
              }}
            />
          </EmailProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export function MswLoader({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function enableMsw() {
      const { worker } = await import('@/mocks/browser');
      await worker.start({ onUnhandledRequest: 'bypass', quiet: true });
      if (active) setReady(true);
    }

    enableMsw();
    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading Voyago...</p>
      </div>
    );
  }

  return <>{children}</>;
}

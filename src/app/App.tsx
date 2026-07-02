import { AppProviders, MswLoader } from './providers';
import { AppRouter } from './router';

export default function App() {
  return (
    <MswLoader>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </MswLoader>
  );
}

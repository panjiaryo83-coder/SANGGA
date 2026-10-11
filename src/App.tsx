import { AppProvider, useApp } from './store';
import LoginPage from './pages/LoginPage';
import MayaApp from './pages/maya/MayaApp';
import RakaApp from './pages/raka/RakaApp';
import AndiApp from './pages/andi/AndiApp';

function AppRouter() {
  const { state } = useApp();

  if (!state.currentUser) {
    return <LoginPage />;
  }

  switch (state.currentUser) {
    case 'maya': return <MayaApp />;
    case 'raka': return <RakaApp />;
    case 'andi': return <AndiApp />;
    default: return <LoginPage />;
  }
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

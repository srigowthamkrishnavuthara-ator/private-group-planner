import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { useAppStore } from './store/appStore';
import { initializeDB } from './db/database';
import Auth from './pages/Auth';
import MainApp from './pages/MainApp';

function App() {
  const { user } = useAuthStore();
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDB();
        setDbReady(true);
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };
    init();
  }, []);

  if (!dbReady) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Initializing...</p>
        </div>
      </div>
    );
  }

  return user ? <MainApp /> : <Auth />;
}

export default App;
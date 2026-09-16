import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Schedule from '../components/Schedule';
import Group from '../components/Group';
import Chat from '../components/Chat';
import Tasks from '../components/Tasks';
import Notes from '../components/Notes';

function MainApp() {
  const { currentTab } = useAppStore();
  const { user, logout } = useAuthStore();

  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'schedule':
        return <Schedule />;
      case 'group':
        return <Group />;
      case 'chat':
        return <Chat />;
      case 'tasks':
        return <Tasks />;
      case 'notes':
        return <Notes />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 text-gray-100">
      <div className="flex-1 overflow-y-auto pb-20">{renderPage()}</div>
      <Navigation />
    </div>
  );
}

export default MainApp;
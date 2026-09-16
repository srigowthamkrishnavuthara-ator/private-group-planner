import { useAppStore } from '../store/appStore';
import { Home, Calendar, Users, MessageSquare, CheckSquare, FileText } from 'lucide-react';

function Navigation() {
  const { currentTab, setCurrentTab } = useAppStore();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'group', label: 'Group', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center w-1/6 py-4 transition-colors ${
                isActive ? 'text-blue-500 border-t-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1 hidden sm:block">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navigation;
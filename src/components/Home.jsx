import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { Calendar, Clock, AlertCircle, Zap } from 'lucide-react';

function Home() {
  const { user } = useAuthStore();
  const { currentGroup, events, tasks, plans, messages } = useAppStore();

  const todayEvents = events.filter(
    (e) => new Date(e.startTime).toDateString() === new Date().toDateString()
  );

  const pendingTasks = tasks.filter((t) => t.status !== 'completed');

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-white mb-1">Welcome, {user?.name}! 👋</h1>
        <p className="text-gray-400">{currentGroup ? currentGroup.name : 'Select or create a group'}</p>
      </div>

      {todayEvents.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Calendar className="mr-2" size={20} />
            Today's Schedule
          </h2>
          <div className="space-y-3">
            {todayEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3 bg-gray-700 p-3 rounded">
                <Clock size={18} className="text-blue-400 mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-white">{event.title}</p>
                  <p className="text-sm text-gray-400">{event.startTime}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    event.visibility === 'private'
                      ? 'bg-red-900 text-red-200'
                      : event.visibility === 'selected'
                      ? 'bg-yellow-900 text-yellow-200'
                      : 'bg-green-900 text-green-200'
                  }`}
                >
                  {event.visibility}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {pendingTasks.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <AlertCircle className="mr-2" size={20} />
            Pending Tasks ({pendingTasks.length})
          </h2>
          <div className="space-y-2">
            {pendingTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center space-x-3 bg-gray-700 p-3 rounded">
                <input type="checkbox" className="w-5 h-5 rounded" />
                <div className="flex-1">
                  <p className="font-medium text-white">{task.title}</p>
                  {task.deadline && <p className="text-xs text-gray-400">Due: {task.deadline}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {plans.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Zap className="mr-2" size={20} />
            Next Plans
          </h2>
          <div className="space-y-2">
            {plans.slice(0, 2).map((plan) => (
              <div key={plan.id} className="bg-gray-700 p-3 rounded">
                <p className="font-medium text-white">{plan.title}</p>
                <p className="text-sm text-gray-400">{plan.time} • {plan.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!todayEvents.length && !pendingTasks.length && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No events or tasks today</p>
          <p className="text-sm mt-2">Create a schedule or task to get started</p>
        </div>
      )}
    </div>
  );
}

export default Home;
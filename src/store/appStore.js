import { create } from 'zustand';

const useAppStore = create((set) => (({
  currentGroup: null,
  groups: [],
  events: [],
  tasks: [],
  messages: [],
  plans: [],
  notes: [],
  members: [],
  darkMode: true,
  currentTab: 'home',

  setCurrentGroup: (group) => set({ currentGroup: group }),
  setGroups: (groups) => set({ groups }),
  setEvents: (events) => set({ events }),
  setTasks: (tasks) => set({ tasks }),
  setMessages: (messages) => set({ messages }),
  setPlans: (plans) => set({ plans }),
  setNotes: (notes) => set({ notes }),
  setMembers: (members) => set({ members }),
  setCurrentTab: (tab) => set({ currentTab: tab }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  addEvent: (event) =>
    set((state) => ({ events: [...state.events, { ...event, id: Date.now() }] })),
  updateEvent: (id, updates) =>
    set((state) => (({
      events: state.events.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),
  deleteEvent: (id) =>
    set((state) => ({ events: state.events.filter((e) => e.id !== id) })),

  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, { ...task, id: Date.now() }] })),
  updateTask: (id, updates) =>
    set((state) => (({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

  addMessage: (message) =>
    set((state) => (({
      messages: [...state.messages, { ...message, id: Date.now(), timestamp: new Date() }],
    })),

  addPlan: (plan) =>
    set((state) => ({ plans: [...state.plans, { ...plan, id: Date.now() }] })),
})));

export { useAppStore };
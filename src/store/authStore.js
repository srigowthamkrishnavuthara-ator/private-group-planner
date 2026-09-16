import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => (({
      user: null,
      loading: false,
      error: null,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const user = {
            id: Math.random().toString(36).substring(7),
            email,
            name: email.split('@')[0],
            createdAt: new Date(),
          };
          set({ user, loading: false });
          return user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      signup: async (email, password, name) => {
        set({ loading: true, error: null });
        try {
          const user = {
            id: Math.random().toString(36).substring(7),
            email,
            name,
            createdAt: new Date(),
          };
          set({ user, loading: false });
          return user;
        } catch (error) {
          set({ error: error.message, loading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, error: null });
      },
    })),
    {
      name: 'auth-storage',
    }
  )
);

export { useAuthStore };
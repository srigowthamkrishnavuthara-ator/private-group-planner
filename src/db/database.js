import Dexie from 'dexie';

const db = new Dexie('PrivateGroupPlanner');

db.version(1).stores({
  users: 'id, email',
  groups: 'id, owner',
  memberships: '++, userId, groupId',
  events: 'id, groupId, ownerId, startTime',
  tasks: 'id, groupId, assignee, deadline',
  messages: 'id, groupId, timestamp',
  notes: 'id, groupId',
  plans: 'id, groupId, time',
  syncQueue: '++id, timestamp',
});

export const initializeDB = async () => {
  try {
    await db.open();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

export default db;
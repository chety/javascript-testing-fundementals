import { http } from 'msw';
import tasks from './tasks.json';

let id = 3;

const createTask = (title) => ({
  id: `${id++}`,
  title,
  completed: false,
  createdAt: new Date('02-29-2024').toISOString(),
  lastModified: new Date('02-29-2024').toISOString(),
});

const getTasks = http.get('/api/tasks', (_, res, ctx) => {
  return res(ctx.json(tasks));
});

const addTask = http.post('/api/tasks', (req, res, ctx) => {
  const { title } = req.body;
  const task = createTask(title);
  return res(ctx.status(201), ctx.json(task));
});

export const handlers = [getTasks, addTask];

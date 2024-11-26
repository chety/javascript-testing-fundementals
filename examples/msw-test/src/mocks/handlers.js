import { rest } from 'msw';

console.log("HANDLERSSSS", {rest});

export const handlers = [
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1, name: 'Mirko Rodik' }));
  }),
  rest.post('/api/login', (req, res, ctx) => {
    const { username } = req.body;
    return res(ctx.status(200), ctx.json({ message: `Welcome ${username}` }));
  }),
];

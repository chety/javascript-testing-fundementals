import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { UserProfile } from './UserProfile';
import { server } from '../mocks/server';
import { rest } from 'msw';

test('renders user profile after fetching data', async () => {
	render(<UserProfile />);

	expect(screen.getByText(/loading/i)).toBeInTheDocument();

	const userName = await screen.findByText('John Doe');
	expect(userName).toBeInTheDocument();
});

test('shows error if unable to fetch data', async () => {
	server.use(
		rest.get('/api/user', (req, res, ctx) => {
			return res(ctx.status(404), ctx.json({ message: 'User not found' }));
		})
	)
	render(<UserProfile />);

	expect(screen.getByText(/loading/i)).toBeInTheDocument();

	const errorMessage = await screen.findByText(/user not found/i);
	expect(errorMessage).toBeInTheDocument();
});
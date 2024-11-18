import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Counter } from './counter';

import '@testing-library/jest-dom/vitest';

const clickNTimes = async (element, times) => {
  await Promise.all(
    Array.from({ length: times }, () => userEvent.click(element)),
  );
};

describe('Counter ', () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it('renders with an initial count of 0', () => {
    expect(screen.getByTestId('counter-count')).toHaveTextContent('0');
  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    expect(screen.getByRole('button', { name: /decrement/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
  });

  it('displays "day" when the count is 0', () => {
    expect(screen.getByTestId('counter-unit')).toHaveTextContent('day');
  });

  it('increments the count when the "Increment" button is clicked', async () => {
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await userEvent.click(incrementButton);
    expect(screen.getByTestId('counter-count')).toHaveTextContent('1');
  });

  it('displays "day" when the count is 1', async () => {
    await userEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByTestId('counter-unit')).toHaveTextContent('day');
  });

  it('decrements the count when the "Decrement" button is clicked', async () => {
    cleanup();
    render(<Counter initialCount={4} />);

    const decrementButton = screen.getByRole('button', { name: /decrement/i });

    expect(decrementButton).toBeEnabled();

    await userEvent.click(decrementButton);
    expect(screen.getByTestId('counter-count')).toHaveTextContent('3');
  });

  it('does not allow decrementing below 0', async () => {
    await userEvent.click(screen.getByRole('button', { name: /increment/i }));
    await clickNTimes(screen.getByRole('button', { name: /decrement/i }), 2);
    expect(screen.getByTestId('counter-count')).toHaveTextContent('0');
  });

  it('resets the count when the "Reset" button is clicked', async () => {
    await clickNTimes(screen.getByRole('button', { name: /increment/i }), 2);
    expect(screen.getByTestId('counter-count')).toHaveTextContent('2');

    await userEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(screen.getByTestId('counter-count')).toHaveTextContent('0');
  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    expect(screen.getByRole('button', { name: /decrement/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /reset/i })).toBeDisabled();
  });

  it('updates the document title based on the count', async () => {
    await clickNTimes(screen.getByRole('button', { name: /increment/i }), 2);

    expect(document.title).toBe('2 days — Accident Counter');
  });
});

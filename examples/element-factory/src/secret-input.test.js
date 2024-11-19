import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';

import { createSecretInput } from './secret-input.js';
import { vi } from 'vitest';

describe('createSecretInput without testing library', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should have loaded the secret from localStorage', () => {
    localStorage.setItem('secret', 'abcd');
    createSecretInput();

    expect(localStorage.getItem('secret')).toBe('abcd');
  });

  it('should save the secret to localStorage', () => {
    const inputContainer = createSecretInput();
    const input = inputContainer.querySelector('input');
    const button = inputContainer.querySelector(
      'button[id="secret-input-button"]',
    );

    input.value = '1234';
    button.click();

    expect(localStorage.getItem('secret')).toBe('1234');
  });

  it('should clear the secret from localStorage', () => {
    localStorage.setItem('secret', 'abcd');
    const inputContainer = createSecretInput();
    const clearButton = inputContainer.querySelector(
      'button[id="secret-input-clear-button"]',
    );
    clearButton.click();
    expect(localStorage.getItem('secret')).toBeNull();
  });
});

describe('createSecretInput with testing library', () => {
  beforeEach(() => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('test-secret');
    vi.spyOn(localStorage, 'setItem');
    vi.spyOn(localStorage, 'removeItem');

    document.body.innerHTML = '';
    document.body.appendChild(createSecretInput());
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should have loaded the secret from localStorage', () => {
    const input = screen.getByLabelText(/secret/i);

    expect(input.value).toBe('test-secret');
  });

  it('should save the secret to localStorage', async () => {
    const input = screen.getByLabelText(/secret/i);
    const button = screen.getByRole('button', { name: /store secret/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'agt');
    await userEvent.click(button);
    expect(localStorage.setItem).toHaveBeenCalledWith('secret', 'agt');
  });

  it('should clear the secret from localStorage', async () => {
    const input = screen.getByLabelText(/secret/i);
    const button = screen.getByRole('button', { name: /store secret/i });

    await userEvent.type(input, 'mirko');
    await userEvent.click(button);

    const clearButton = screen.getByRole('button', { name: /clear secret/i });
    await userEvent.click(clearButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith('secret');
  });
});

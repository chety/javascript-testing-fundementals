import { createButton } from './button.js';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';

describe('createButton', () => {
  beforeAll(() => {
    document.body.appendChild(createButton());
  });

  it('should create a button element', () => {
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).not.toBeNull();
    expect(button).toBeInTheDocument();
  });

  it('should have the text "Click Me"', () => {
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveTextContent(/click me/gi);
  });

  it('should change the text to "Clicked!" when clicked', async () => {
    const button = screen.getByRole('button', { name: /click me/i });
    // await fireEvent.click(button);
    await userEvent.click(button);
    expect(button).toHaveTextContent(/clicked!/gi);
  });
});

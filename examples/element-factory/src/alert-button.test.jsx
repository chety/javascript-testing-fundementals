import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AlertButton } from './alert-button';

describe('AlertButton', () => {
  beforeEach(() => {});

  afterEach(() => {});

  const alertSpy = vi.spyOn(window, 'alert');
  it('should render an alert button', async () => {
    render(<AlertButton />);
    const button = screen.getByRole('button', { name: /trigger alert/i });
    const input = screen.getByRole('textbox', { name: /message/i });

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Alert!');
  });

  it('should trigger an alert', async () => {
    const mockOnSubmit = vi.fn();
    render(
      <AlertButton onSubmit={mockOnSubmit} defaultMessage="Hello There" />,
    );
    const button = screen.getByRole('button', { name: /trigger alert/i });
    await userEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledWith('Hello There');
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should update the message when the input changes ', async () => {
    const mockOnSubmit = vi.fn();
    render(<AlertButton onSubmit={mockOnSubmit} />);
    const input = screen.getByRole('textbox', { name: /message/i });
    const button = screen.getByRole('button', { name: /trigger alert/i });

    await userEvent.clear(input);
    await userEvent.type(input, 'Hello');
    await userEvent.click(button);
    expect(mockOnSubmit).toHaveBeenCalledWith('Hello');
  });
});

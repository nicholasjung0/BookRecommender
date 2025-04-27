import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle Component', () => {
  test('renders the button with correct initial text', () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Switch to Dark Mode');
  });

  test('calls onToggle function when clicked', () => {
    const onToggleMock = jest.fn();
    render(<ThemeToggle theme="light" onToggle={onToggleMock} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  test('displays correct text when theme is dark', () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveTextContent('Switch to Light Mode');
  });
});

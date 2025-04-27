import { render, screen } from '@testing-library/react';
import HomeComponent from './HomeComponent';

describe('HomeComponent', () => {
  test('renders welcome message', () => {
    render(<HomeComponent />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("Welcome to the Book Lover's Hub!");
  });

  test('renders description text', () => {
    render(<HomeComponent />);
    expect(screen.getByText('Discover amazing books and let us recommend new favorites for you!')).toBeInTheDocument();
  });
});

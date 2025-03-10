import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('displays an error message for invalid login', () => {
    render(<Login onLogin={() => {}} />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Invalid username or password.')).toBeInTheDocument();
});
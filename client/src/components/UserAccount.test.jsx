// File located at client/src/components/UserAccount.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserAccount from './UserAccount';

describe('UserAccount Component', () => {
    let onCreateAccountMock;

    beforeEach(() => {
        // Mock function to simulate account creation
        onCreateAccountMock = jest.fn();
        localStorage.clear();
    });

    test('renders the form with username and password fields', () => {
        render(<UserAccount onCreateAccount={onCreateAccountMock} />);
        
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Create Account')).toBeInTheDocument();
    });

    test('shows error if fields are empty', () => {
        render(<UserAccount onCreateAccount={onCreateAccountMock} />);
        
        fireEvent.click(screen.getByText('Create Account'));
        
        expect(screen.getByText('Please enter a username and password.')).toBeInTheDocument();
        expect(onCreateAccountMock).not.toHaveBeenCalled();
    });

    test('creates a new account successfully', () => {
        render(<UserAccount onCreateAccount={onCreateAccountMock} />);
        
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Create Account'));

        expect(screen.getByText('Account created successfully!')).toBeInTheDocument();
        expect(onCreateAccountMock).toHaveBeenCalledWith('newuser', 'password123');
    });

    test('shows error if username already exists', () => {
        const existingAccounts = { existinguser: 'password' };
        localStorage.setItem('accounts', JSON.stringify(existingAccounts));
        
        render(<UserAccount onCreateAccount={onCreateAccountMock} />);

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'existinguser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });
        fireEvent.click(screen.getByText('Create Account'));

        expect(screen.getByText('Username already exists.')).toBeInTheDocument();
        expect(onCreateAccountMock).not.toHaveBeenCalled();
    });
});

// File located in client/src/components/UserAccount.jsx

import React, { useState } from 'react';

function UserAccount({ onCreateAccount }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        if (accounts[username]) {
            setMessage('Username already exists.');
        } else if (username && password) {
            onCreateAccount(username, password);
            setMessage('Account created successfully!');
            setUsername('');
            setPassword('');
        } else {
            setMessage('Please enter a username and password.');
        }
    };

    return (
        <div className="user-account-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Create Account</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UserAccount;
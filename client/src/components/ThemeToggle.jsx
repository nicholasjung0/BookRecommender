// File located in client/src/components/ThemeToggle.jsx

import React from 'react';

function ThemeToggle({ theme, onToggle }) {
    return (
        <button onClick={onToggle} style={{ marginBottom: '20px' }}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}

export default ThemeToggle;
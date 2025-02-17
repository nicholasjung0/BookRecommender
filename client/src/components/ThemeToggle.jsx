// File: client/src/components/ThemeToggle.jsx

import React, { useState } from 'react';

function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    function toggleTheme() {
        setDarkMode(!darkMode);
        document.body.style.backgroundColor = darkMode ? '#fff' : '#333';
        document.body.style.color = darkMode ? '#000' : '#fff';
    }

    return <button onClick={toggleTheme}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>;
}

export default ThemeToggle;
// File: client/src/components/ThemeToggle.jsx

import React, { useState, useEffect } from 'react';

function ThemeToggle({ theme, onToggle }) {
    const [darkMode, setDarkMode] = useState(theme === 'dark');

    useEffect(() => {
        setDarkMode(theme === 'dark');
        document.body.classList.toggle('dark-mode', darkMode);
    }, [theme, darkMode]);

    function toggleTheme() {
        setDarkMode(!darkMode);
        onToggle();
    }

    return <button onClick={toggleTheme}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>;
}

export default ThemeToggle;
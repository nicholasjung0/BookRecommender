// File located in client/src/components/BookRecommendation.jsx

import React, { useState } from 'react';

const BookRecommendation = ({ userPreferences, setUserPreferences, getRecommendations, bookRecommendations }) => {
    const [genreInput, setGenreInput] = useState('');
    const [authorInput, setAuthorInput] = useState('');

    const handleAddGenre = () => {
        if (genreInput.trim() !== '') {
            setUserPreferences({
                ...userPreferences,
                favoriteGenres: [...userPreferences.favoriteGenres, genreInput]
            });
            setGenreInput('');
        }
    };

    const handleAddAuthor = () => {
        if (authorInput.trim() !== '') {
            setUserPreferences({
                ...userPreferences,
                favoriteAuthors: [...userPreferences.favoriteAuthors, authorInput]
            });
            setAuthorInput('');
        }
    };

    const handleResetPreferences = () => {
        setUserPreferences({
            favoriteGenres: [],
            favoriteAuthors: []
        });
    };

    return (
        <div>
            <h2>Book Recommendations</h2>
            <div>
                <h3>Set Your Preferences</h3>
                <input
                    type="text"
                    value={genreInput}
                    onChange={(e) => setGenreInput(e.target.value)}
                    placeholder="Add a favorite genre"
                />
                <button onClick={handleAddGenre}>Add Genre</button>
                <input
                    type="text"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    placeholder="Add a favorite author"
                />
                <button onClick={handleAddAuthor}>Add Author</button>
                <button onClick={handleResetPreferences}>Reset Preferences</button>
            </div>
            <button onClick={getRecommendations}>Get Recommendations</button>
            <h3>Your Personal Recommendations</h3>
            <ul>
                {bookRecommendations.map((rec, index) => (
                    <li key={index}>
                        <strong>{rec.title}</strong> by {rec.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookRecommendation;
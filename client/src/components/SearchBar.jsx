// File located in client/src/components/SearchBar.jsx

import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearchResults }) {
    const [searchTerm, setSearchTerm] = useState("");

    function searchBooks() {
        if (searchTerm.trim() === "") {
            alert("Please enter something to search for!");
            return;
        }

        const url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(searchTerm);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const books = data.items || [];
                onSearchResults(books);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was a problem. Please try again later.');
            });

        setSearchTerm("");
    }

    return (
        <div className="search-bar">
            <input 
                type="text"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder="Enter book name..."
                className="search-input"
            />
            <button onClick={searchBooks} className="search-button">
                Search
            </button>
        </div>
    );
}

export default SearchBar;
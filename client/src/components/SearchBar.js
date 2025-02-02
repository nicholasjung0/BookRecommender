import React from 'react';
import { useState } from 'react';
import './SearchBar.css'; // Import external CSS

function SearchBar({ onSearchResults }) {
    const [query, setQuery] = useState("");

    const searchBooks = async () => {
        if (!query) {
            console.log("Empty Query - end"); 
            return;
        }
        console.log("Query not empty, query: '${query}'");

        // Pull from Google Books API
        const encodedQ = encodeURIComponent(query);
        const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + encodedQ;

        // Get repsonse from API
        const response = await fetch(apiUrl);
        const info = await response.json();
        const bookitems = info.items; 

        onSearchResults(bookitems);
        setQuery("");
    };

    return ( // output for formatting search bar
        <div className="search-bar">
            <input 
                type = "text"
                value = {query}
                onChange = {(e) => setQuery(e.target.value)}
                placeholder = "Search for books"
                className = "search-input"
            />
            <button 
                onClick = {searchBooks} 
                className = "search-button"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;

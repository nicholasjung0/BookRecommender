import React from 'react';
import { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {  
    const [query, setQuery] = useState(""); 
    // Prompt for query

    function searchBooks() {  
        if (query == "") {   
            alert("Please enter a search term!"); 
            return;
        }

        // Pull info from Google Books API (call)
        var baseUrl = "https://www.googleapis.com/books/v1/volumes?q="; 
        var fullUrl = baseUrl + encodeURIComponent(query); 

        // Fetch response and parse .json
        fetch(fullUrl)
            .then(response => response.json())
            .then(data => {
                var bookitems; 
                if (data.items) {
                    bookitems = data.items;
                } else {
                    bookitems = []; 
                }

                props.onSearchResults(bookitems);
            })
            .catch(error => {});  

        setQuery("");
    }

    // Output to webpage via HTML
    return (
        <div class="search-bar"> 
            <input 
                type="text"
                value={query}
                onChange={function(event) { setQuery(event.target.value) }}
                placeholder="Type book name..."
                class="search-input"
            />
            <button 
                onclick={searchBooks}  
                class="search-button"
            >
                Search Now
            </button>
        </div>
    );
}

export default SearchBar;

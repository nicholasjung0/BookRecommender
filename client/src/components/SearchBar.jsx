import React from 'react';
import { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {  
    const [query, setQuery] = useState(""); 

    function searchBooks() {  
        if (query == "") {   
            alert("Please enter a search term!"); 
            return;
        }

        var baseUrl = "https://www.googleapis.com/books/v1/volumes?q="; 
        var fullUrl = baseUrl + encodeURIComponent(query); 

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

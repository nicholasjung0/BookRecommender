import React from 'react';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';

function App() {  
    const [books, setBooks] = useState([]);  
    const [selectedBook, setSelectedBook] = useState(null);  

    function updateBooks(newBooks) {  
        setBooks(newBooks);  
        setSelectedBook(null);  
    }

    function chooseBook(book) {  
        setSelectedBook(book);  
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Book Finder</h1>
            <SearchBar onSearchResults={updateBooks} />
            <BookList books={books} onSelectBook={chooseBook} />
            <BookDetail book={selectedBook} />
        </div>
    );
}

export default App;

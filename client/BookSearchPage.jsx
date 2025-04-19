// File located in client/src/components/BookSearchPage.jsx

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BookList from './BookList';

const BookSearchPage = ({ onSearchResults, onSelectBook }) => {
  const [books, setBooks] = useState([]);

  function handleSearchResults(newBooks) {
    setBooks(newBooks);
    onSearchResults(newBooks); // Call the parent function if needed
  }

  return (
    <div>
      <h2>Book Search</h2>
      <SearchBar onSearchResults={handleSearchResults} />
      <BookList books={books} onSelectBook={onSelectBook} /> {/* Pass down the onSelectBook handler */}
    </div>
  );
};

export default BookSearchPage;
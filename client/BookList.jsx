// File located in client/src/components/BookList.jsx

import React from 'react';
import './BookList.css';

function BookList(props) {
  if (!props.books || props.books.length === 0) {
    return <p className="books-not-found">No books found. Try another search?</p>;
  }

  return (
    <div className="book-wrapper">
      <h2>Here are some books:</h2>
      <ul className="book-list">
        {props.books.map((book) => {
          let title = book.volumeInfo.title || "Untitled Book";
          let authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
          let amazonSearchLink = `https://www.amazon.com/s?k=${encodeURIComponent(title)}`;

          return (
            <li key={book.id} className="book-item">
              <span className="book-link" onClick={() => props.onSelectBook(book)}> {/* Call onSelectBook when clicked */}
                {title} - {authors}
              </span>
              <a href={amazonSearchLink} target="_blank" rel="noopener noreferrer" className="amazon-link">
                Buy on Amazon
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookList;
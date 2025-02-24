// File located in client/src/components/BookList.jsx

import React from 'react';
import './BookList.css';

function BookList(props) {  
    if (!props.books || props.books.length === 0) {
        return <p className="books-not-found">No books found. Try another search?</p>;
    }

    return (
        <div className="book-wrapper">  
            <div className="book-list">
                <h2>Here are some books:</h2>
                <ul>
                    {props.books.map((book) => {
                        let title = book.volumeInfo.title || "Untitled Book";
                        let authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
                        let amazonSearchLink = `https://www.amazon.com/s?k=${encodeURIComponent(title)}`;

                        return (
                            <li key={book.id} className="book-item">
                                <span 
                                    className="book-link" 
                                    onClick={() => props.onSelectBook(book)}
                                >
                                    {title} - {authors}
                                </span>
                                <br />
                                <a href={amazonSearchLink} target="_blank" rel="noopener noreferrer">
                                    Buy on Amazon
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default BookList;

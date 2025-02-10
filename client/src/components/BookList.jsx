// File located in client/src/components/BookList.jsx

import React from 'react';
import './BookList.css';

function BookList(props) {  
    if (!props.books || props.books.length === 0) {
        return <p class="books-not-found">No books found. Try another search?</p>;
    } // No books found catch

    // Output booklist via HTML
    return (
        <div class="book-wrapper">  
            <div class="book-list">
                <h2>Here are some books:</h2>
                <ul>
                    {props.books.map(function(book) {
                        var title = book.volumeInfo.title;
                        var authors = book.volumeInfo.authors;
                        var authorText;

                        if (authors && authors.length > 0) {
                            authorText = " - " + authors.join(", ");
                        } else {
                            authorText = " - Unknown Author";
                        }

                        return (
                            <div key={book.id} class="book-container">  
                                <li class="book-item">
                                    <span 
                                        class="book-link" 
                                        onClick={function() {
                                            props.onSelectBook(book);
                                        }}
                                    >
                                        {title ? title : "Untitled Book"} {authorText}
                                    </span>
                                </li>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default BookList;

import React from 'react';
import './BookList.css';

const BookList = ({ books, onSelectBook }) => {
    if (!books || books.length === 0) {
        console.log("Books not found");
        return <p className="books-not-found">No books found. Try another search?</p>;
    }

    console.log("Rendering book list... Number of books:", books.length);

    return (
        <div className="book-wrapper">  {}
            <div className="book-list">
                <h2>Here are some books you might like:</h2>
                <ul>
                    {books.map((book) => {
                        const { title, authors } = book.volumeInfo;
                        console.log(`Book found: ${title}`); 
                        
                        return (
                            <div key={book.id} className="book-container"> {}
                                <li className="book-item">
                                    <span 
                                        className="book-link" 
                                        onClick={() => {
                                            console.log("User selected book:", title);
                                            onSelectBook(book);
                                        }}
                                    >
                                        {title || "Untitled Book"} {}
                                        {authors && authors.length > 0 
                                            ? ` - ${authors.join(', ')}` 
                                            : " - Unknown Author"
                                        }
                                    </span>
                                </li>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default BookList;

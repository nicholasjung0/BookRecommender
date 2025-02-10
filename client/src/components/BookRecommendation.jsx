// File located in client/src/components/BookRecommendation.jsx

import React, { useState } from 'react';

const BookRecommendation = () => {
    const [books, setBooks] = useState([]);

    const getRecommendedBooks = async (title) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=5`);
            const data = await response.json();
            if (data.items) {
                const bookList = data.items.map(item => {
                    return {
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown'
                    };
                });
                setBooks(bookList);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const showRecommendation = () => {
        if (books.length > 0) {
            const firstBook = books[0];
            getRecommendedBooks(firstBook.title);
        }
    };

    return (
        <div>
            <button onClick={showRecommendation}>Show Recommendation</button>
            <h2>Recommended Books:</h2>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <strong>{book.title}</strong> by {book.author}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookRecommendation;
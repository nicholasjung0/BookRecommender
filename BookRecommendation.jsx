import React, { useState } from 'react';

const BookRecommendation = ({ currentBook }) => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);

    const getRecommendedBooks = async (title, author, genre) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=10`);
            const data = await response.json();
            if (data.items) {
                const bookList = data.items.map(item => {
                    return {
                        title: item.volumeInfo.title,
                        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown',
                        genres: item.volumeInfo.categories || [],
                        rating: item.volumeInfo.averageRating || 0
                    };
                });
                recommendBooks(bookList, author, genre);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const recommendBooks = (books, currentAuthor, currentGenre) => {
        const filteredBooks = books.filter(book => {
            return book.author !== currentAuthor && book.genres.includes(currentGenre);
        });

        const sortedBooks = filteredBooks.sort((a, b) => b.rating - a.rating).slice(0, 5);
        setRecommendedBooks(sortedBooks);
    };

    const showRecommendation = () => {
        if (currentBook) {
            getRecommendedBooks(currentBook.title, currentBook.author, currentBook.genres[0]);
        }
    };

    return (
        <div>
            <button onClick={showRecommendation}>Show Recommendation</button>
            <h2>Recommended Books:</h2>
            <ul>
                {recommendedBooks.map((book, index) => (
                    <li key={index}>
                        <strong>{book.title}</strong> by {book.author} - Rating: {book.rating}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookRecommendation;
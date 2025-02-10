/* File located in client/src/App.jsx */

/* File located in client/src/App.jsx */

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import ReviewSubmission from './components/ReviewSubmission';
import BookRecommendation from './components/BookRecommendation';
import './App.css';

function App() {
    const [allBooks, setAllBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [bookRecommendations, setBookRecommendations] = useState([]);
    const [userReviews, setUserReviews] = useState(JSON.parse(localStorage.getItem('userReviews')) || {});

    function handleBookUpdate(newBookList) {
        setAllBooks(newBookList);
        setCurrentBook(null);
        setBookRecommendations([]);
    }

    function handleBookSelect(book) {
        setCurrentBook(book);
    }

    function handleAddRecommendation(newRecommendation) {
        setBookRecommendations([...bookRecommendations, newRecommendation]);
    }

    function handleSaveReview(bookTitle, reviewText) {
        const updatedReviews = {
            ...userReviews,
            [bookTitle]: reviewText
        };
        setUserReviews(updatedReviews);
        localStorage.setItem('userReviews', JSON.stringify(updatedReviews));
    }

    const getRecommendations = async (bookTitle) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&maxResults=5`);
            const data = await response.json();
            if (data.items) {
                const recommendedBooks = data.items.map(item => ({
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown'
                }));
                setBookRecommendations(recommendedBooks);
            }
        } catch (error) {
            console.error('There was an error fetching recommendations:', error);
        }
    };

    return (
        <div className="app-container">
            <h1>Welcome to Book Lover's Hub</h1>
            <SearchBar onSearchResults={handleBookUpdate} onFetchRecommendations={getRecommendations} />
            <BookList books={allBooks} onSelectBook={handleBookSelect} />
            <BookDetail book={currentBook} />
            <ReviewSubmission book={currentBook} onSaveReview={handleSaveReview} />
            <BookRecommendation />
            
            <h2>Your Personal Recommendations</h2>
            <ul>
                {bookRecommendations.map((rec, index) => (
                    <li key={index}>
                        Title: {rec.title}
                        <br />
                        Author: {rec.author}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
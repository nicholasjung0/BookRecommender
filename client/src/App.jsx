/* File located in client/src/App.jsx */

import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import ReviewSubmission from './components/ReviewSubmission';
import BookRecommendation from './components/BookRecommendation';
import BookReviewList from './components/BookReviewList';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import Pagination from './components/Pagination';
import ThemeToggle from './components/ThemeToggle';
import UserAccount from './components/UserAccount';
import Login from './components/Login';
import './App.css';

function App() {
    const [allBooks, setAllBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [bookRecommendations, setBookRecommendations] = useState([]);
    const [userReviews, setUserReviews] = useState(JSON.parse(localStorage.getItem('userReviews')) || {});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [theme, setTheme] = useState('light');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);

    function handleBookUpdate(newBookList) {
        setAllBooks(newBookList);
        setCurrentBook(null);
        setBookRecommendations([]);
        setCurrentPage(1);
    }

    function handleBookSelect(book) {
        setCurrentBook(book);
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
        setLoading(true);
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
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    function changeTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    function handleCreateAccount(username, password) {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        accounts[username] = password;
        localStorage.setItem('accounts', JSON.stringify(accounts));
        setUsername(username);
        setIsLoggedIn(true);
        setShowCreateAccount(false);
    }

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const totalPages = Math.ceil(allBooks.length / itemsPerPage);
    const currentItems = allBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <ErrorBoundary>
            <div className={`app-container ${theme}`}>
                <h1 className="app-title">Welcome to Book Lover's Hub</h1>
                <ThemeToggle theme={theme} onToggle={changeTheme} />
                {!isLoggedIn ? (
                    <div className="auth-container">
                        {showCreateAccount ? (
                            <UserAccount onCreateAccount={handleCreateAccount} />
                        ) : (
                            <Login onLogin={handleLogin} />
                        )}
                        <button className="auth-toggle-button" onClick={() => setShowCreateAccount(!showCreateAccount)}>
                            {showCreateAccount ? 'Back to Login' : 'Create an Account'}
                        </button>
                    </div>
                ) : (
                    <>
                        <SearchBar onSearchResults={handleBookUpdate} onFetchRecommendations={getRecommendations} />
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                        <div className="book-list-container">
                            <BookList books={currentItems} onSelectBook={handleBookSelect} />
                            {loading && <LoadingIndicator />}
                        </div>
                        <div className="book-detail-reviews">
                            <BookDetail book={currentBook} />
                            <ReviewSubmission book={currentBook} onSaveReview={handleSaveReview} />
                            <BookReviewList reviews={userReviews} />
                        </div>
                        <BookRecommendation />
                        <h2 className="recommendation-title">Your Personal Recommendations</h2>
                        <ul className="recommendation-list">
                            {bookRecommendations.map((rec, index) => (
                                <li key={index} className="recommendation-item">
                                    <strong>{rec.title}</strong> by {rec.author}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </ErrorBoundary>
    );
}

export default App;
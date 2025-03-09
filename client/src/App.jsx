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
    const [userPreferences, setUserPreferences] = useState({
        favoriteGenres: [],
        favoriteAuthors: []
    });

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

    const getRecommendations = async () => {
        setLoading(true);
        try {
            // Fetch books based on favorite genres
            const genreQuery = userPreferences.favoriteGenres.join('|');
            const genreResponse = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=subject:${genreQuery}&maxResults=5`
            );
            const genreData = await genreResponse.json();

            // Fetch books based on favorite authors
            const authorQuery = userPreferences.favoriteAuthors.join('|');
            const authorResponse = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorQuery}&maxResults=5`
            );
            const authorData = await authorResponse.json();

            // Combine results from both queries
            const combinedResults = [...(genreData.items || []), ...(authorData.items || [])];

            // Remove duplicates (books that appear in both genre and author results)
            const uniqueResults = combinedResults.filter(
                (book, index, self) =>
                    index === self.findIndex((b) => b.id === book.id)
            );

            // Map the results to a simplified format
            if (uniqueResults.length > 0) {
                const recommendedBooks = uniqueResults.map((item) => ({
                    title: item.volumeInfo.title,
                    author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown',
                }));
                setBookRecommendations(recommendedBooks);
            } else {
                setBookRecommendations([]); // No recommendations found
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
                        <SearchBar onSearchResults={handleBookUpdate} />
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
                        <BookRecommendation
                            userPreferences={userPreferences}
                            setUserPreferences={setUserPreferences}
                            getRecommendations={getRecommendations}
                            bookRecommendations={bookRecommendations}
                        />
                    </>
                )}
            </div>
        </ErrorBoundary>
    );
}

export default App;
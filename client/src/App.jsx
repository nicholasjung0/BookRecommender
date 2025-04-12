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
import FeedbackForm from './components/FeedbackForm';
import './App.css';

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [bookRecommendations, setBookRecommendations] = useState([]);
  const [userReviews, setUserReviews] = useState(JSON.parse(localStorage.getItem('userReviews')) || {});
  const [userRatings, setUserRatings] = useState(JSON.parse(localStorage.getItem('userRatings')) || {});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState('light');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [userPreferences, setUserPreferences] = useState({ favoriteGenres: [], favoriteAuthors: [] });
  const [userInteractions, setUserInteractions] = useState({ clicks: [], timeSpent: [], searches: [] });

  function handleBookUpdate(newBookList) {
    setAllBooks(newBookList);
    setCurrentBook(null);
    setBookRecommendations([]);
    setCurrentPage(1);
  }

  function handleBookSelect(book) {
    setCurrentBook(book);
    setUserInteractions(prev => ({
      ...prev,
      clicks: [...prev.clicks, book.id],
    }));
  }

  function handleSaveReview(book, reviewText, rating) {
    const updatedReviews = {
      ...userReviews,
      [book.id]: { text: reviewText, rating: rating, username: username }
    };
    setUserReviews(updatedReviews);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));

    const updatedRatings = {
      ...userRatings,
      [book.id]: rating
    };
    setUserRatings(updatedRatings);
    localStorage.setItem('userRatings', JSON.stringify(updatedRatings));
  }

  const calculateRecommendationScore = (book) => {
    const genreWeight = 0.4;
    const ratingWeight = 0.3;
    const popularityWeight = 0.15;
    const interactionWeight = 0.1;
    const userRatingWeight = 0.05;

    const genreMatch = userPreferences.favoriteGenres.some(genre =>
      book.volumeInfo.categories?.includes(genre) ? 1 : 0
    );

    const rating = book.volumeInfo.averageRating || 0;
    const popularity = book.volumeInfo.ratingsCount || 0;

    const interactionScore = userInteractions.clicks.filter(id => id === book.id).length;
    const userRating = userRatings[book.id] || 0;

    const score =
      genreMatch * genreWeight +
      rating * ratingWeight +
      popularity * popularityWeight +
      interactionScore * interactionWeight +
      userRating * userRatingWeight;

    return score;
  };

  const getRecommendations = () => {
    const scoredBooks = allBooks.map(book => ({
      ...book,
      score: calculateRecommendationScore(book),
    }));

    const sortedBooks = scoredBooks.sort((a, b) => b.score - a.score);
    const topN = sortedBooks.slice(0, 10);

    setBookRecommendations(topN.map(book => ({
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'Unknown',
      id: book.id
    })));
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
              <ReviewSubmission book={currentBook} onSaveReview={handleSaveReview} username={username} />
              <BookReviewList book={currentBook} reviews={userReviews} />
            </div>
            <BookRecommendation
              userPreferences={userPreferences}
              setUserPreferences={setUserPreferences}
              getRecommendations={getRecommendations}
              bookRecommendations={bookRecommendations}
            />
            <FeedbackForm />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
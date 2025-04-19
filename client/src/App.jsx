/* File located in client/src/App.jsx */

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail'; // Import BookDetail
import ReviewSubmission from './components/ReviewSubmission';
import BookReviewList from './components/BookReviewList';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingIndicator from './components/LoadingIndicator';
import Pagination from './components/Pagination';
import ThemeToggle from './components/ThemeToggle';
import UserAccount from './components/UserAccount';
import Login from './components/Login';
import FeedbackForm from './components/FeedbackForm';
import RecommendationWeightSettings from './components/RecommendationWeightSettings'; 
import BookRecommendation from './components/BookRecommendation'; 
import BookSearchPage from './components/BookSearchPage'; // BookSearchPage component
import HomeComponent from './components/HomeComponent'; 
import './App.css';

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null); // Track the current book selected
  const [bookRecommendations, setBookRecommendations] = useState([]);
  const [userReviews, setUserReviews] = useState(JSON.parse(localStorage.getItem('userReviews')) || {});
  const [userRatings, setUserRatings] = useState(JSON.parse(localStorage.getItem('userRatings')) || {});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState('light'); // State for current theme
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [userPreferences, setUserPreferences] = useState({ favoriteGenres: [], favoriteAuthors: [] });
  const [userInteractions, setUserInteractions] = useState({ clicks: [], timeSpent: [], searches: [] });
  const [userWeights, setUserWeights] = useState({
    genreWeight: 0.4,
    ratingWeight: 0.3,
    popularityWeight: 0.15,
    interactionWeight: 0.1,
    userRatingWeight: 0.05,
  });
  const [message, setMessage] = useState('');

  // Function to update the book list
  const handleBookUpdate = (newBookList) => {
    setAllBooks(newBookList);
    setCurrentBook(null); // Reset the selected book
  };

  // Function to select a book
  const handleBookSelect = (book) => {
    setCurrentBook(book); // Update the current book state
  };

  // Function to save user review
  const handleSaveReview = (book, reviewText, rating) => {
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
  };

  // Function to toggle theme
  const changeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Function to calculate recommendation score
  const calculateRecommendationScore = (book) => {
    const { 
      genreWeight, 
      ratingWeight, 
      popularityWeight, 
      interactionWeight, 
      userRatingWeight 
    } = userWeights; // Use user-defined weights

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

  // Function to fetch recommendations
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

  // Function to create an account
  function handleCreateAccount(username, password) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || {};
    accounts[username] = password;
    localStorage.setItem('accounts', JSON.stringify(accounts));
    setUsername(username);
    setIsLoggedIn(true);
    setShowCreateAccount(false);
    setMessage('Account created successfully!'); // Show success message
  }

  // Function to handle login
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setMessage('Login successful!'); // Show login message
  };

  const totalPages = Math.ceil(allBooks.length / itemsPerPage);
  const currentItems = allBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Router>
      <ErrorBoundary>
        <div className={`app-container ${theme}`}> {/* Apply theme class */}
          <h1 className="app-title">Welcome to Book Lover's Hub</h1>
          <ThemeToggle theme={theme} onToggle={changeTheme} />
          <nav>
            <Link to="/">Home</Link>
            <Link to="/search">Book Search</Link>
            <Link to="/recommendations">Book Recommendations</Link>
            <Link to="/recommendation-settings">Recommendation Settings</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route 
              path="/search" 
              element={<BookSearchPage 
                onSearchResults={handleBookUpdate} 
                onSelectBook={handleBookSelect} 
              />} 
            />
            <Route 
              path="/recommendations" 
              element={<BookRecommendation 
                userPreferences={userPreferences} 
                setUserPreferences={setUserPreferences}
                getRecommendations={getRecommendations}
                bookRecommendations={bookRecommendations} />} 
            />
            <Route 
              path="/recommendation-settings" 
              element={<RecommendationWeightSettings onWeightsChange={setUserWeights} />} 
            />
          </Routes>

          {/* Render BookDetail when a book is selected */}
          {currentBook && <BookDetail book={currentBook} theme={theme} />} {/* Pass theme as prop */}
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
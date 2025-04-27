// File located in client/src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import SearchBar from './components/SearchBar';
import BookDetail from './components/BookDetail'; 
import ErrorBoundary from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';
import BookRecommendation from './components/BookRecommendation'; 
import BookSearchPage from './components/BookSearchPage'; 
import HomeComponent from './components/HomeComponent'; 
import UserAccount from './components/UserAccount';
import Login from './components/Login';
import './App.css';

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [bookRecommendations, setBookRecommendations] = useState([]);
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [userPreferences, setUserPreferences] = useState({ 
    favoriteGenres: [], 
    favoriteAuthors: [] 
  });
  const [theme, setTheme] = useState('light');
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleBookUpdate = (newBookList) => {
    setAllBooks(newBookList);
    setCurrentBook(null);
  };

  const handleCreateAccount = (username, password) => {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || {};
    accounts[username] = password;
    localStorage.setItem('accounts', JSON.stringify(accounts));
  };

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const calculateRecommendationScore = (book) => {
    if (!book.volumeInfo) return 0;

    let score = 0;
    const { categories, authors } = book.volumeInfo;

    if (categories && userPreferences.favoriteGenres.length > 0) {
      userPreferences.favoriteGenres.forEach(genre => {
        if (categories.some(cat => cat.toLowerCase().includes(genre.toLowerCase()))) {
          score += 2;
        }
      });
    }

    if (authors && userPreferences.favoriteAuthors.length > 0) {
      userPreferences.favoriteAuthors.forEach(author => {
        if (authors.some(auth => auth.toLowerCase().includes(author.toLowerCase()))) {
          score += 3;
        }
      });
    }

    return score;
  };

  const getRecommendations = () => {
    if (allBooks.length === 0) {
      const defaultRecommendations = [
        { id: '1', title: 'The Hobbit', author: 'J.R.R. Tolkien', score: 0 },
        { id: '2', title: 'Pride and Prejudice', author: 'Jane Austen', score: 0 },
        { id: '3', title: '1984', author: 'George Orwell', score: 0 },
        { id: '4', title: 'To Kill a Mockingbird', author: 'Harper Lee', score: 0 },
        { id: '5', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', score: 0 },
      ];

      const filteredDefault = defaultRecommendations.map(book => {
        let score = 0;
        if (userPreferences.favoriteAuthors.some(author => 
          book.author.toLowerCase().includes(author.toLowerCase()))) {
          score += 3;
        }
        return { ...book, score };
      }).sort((a, b) => b.score - a.score);

      setAllRecommendations(filteredDefault);
      setBookRecommendations(filteredDefault.slice(0, 10));
      setShowAllRecommendations(false);
      return;
    }

    const scoredBooks = allBooks.map(book => ({
      ...book,
      score: calculateRecommendationScore(book),
    }));

    const sortedBooks = scoredBooks.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.volumeInfo.title.localeCompare(a.volumeInfo.title);
    });

    const filteredBooks = userPreferences.favoriteGenres.length > 0 || 
                         userPreferences.favoriteAuthors.length > 0
      ? sortedBooks.filter(book => book.score > 0)
      : sortedBooks;

    const allRecs = filteredBooks.slice(0, 100).map(book => ({
      id: book.id,
      title: book.volumeInfo?.title || "Unknown Title",
      author: book.volumeInfo?.authors?.[0] || "Unknown Author",
      score: book.score,
    }));

    setAllRecommendations(allRecs);
    setBookRecommendations(allRecs.slice(0, 10));
    setShowAllRecommendations(false);
  };

  const toggleShowAllRecommendations = () => {
    if (showAllRecommendations) {
      setBookRecommendations(allRecommendations.slice(0, 10));
    } else {
      setBookRecommendations(allRecommendations);
    }
    setShowAllRecommendations(!showAllRecommendations);
  };

  const changeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <ErrorBoundary>
        <div className={`app-container ${theme}`}>
          <header className="app-header">
            <h1 className="app-title">BookLovers Hub</h1>
            <ThemeToggle theme={theme} onToggle={changeTheme} />
            {currentUser && (
              <div className="user-info">
                <span>Welcome, {currentUser}!</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </div>
            )}
          </header>

          <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/search" className="nav-link">Book Search</Link>
            <Link to="/recommendations" className="nav-link">Recommendations</Link>
            <Link to="/account" className="nav-link">Account</Link>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomeComponent />} />
              <Route 
                path="/search" 
                element={
                  <BookSearchPage 
                    onSearchResults={handleBookUpdate} 
                    onSelectBook={setCurrentBook} 
                    theme={theme}
                  />
                } 
              />
              <Route 
                path="/recommendations" 
                element={
                  <BookRecommendation 
                    userPreferences={userPreferences} 
                    setUserPreferences={setUserPreferences}
                    getRecommendations={getRecommendations}
                    bookRecommendations={bookRecommendations}
                    allRecommendations={allRecommendations}
                    showAllRecommendations={showAllRecommendations}
                    toggleShowAll={toggleShowAllRecommendations}
                    theme={theme}
                  />
                } 
              />
              <Route 
                path="/account" 
                element={
                  <div className="account-page">
                    <Login onLogin={handleLogin} />
                    <UserAccount onCreateAccount={handleCreateAccount} />
                  </div>
                }
              />
            </Routes>
          </main>

          {currentBook && <BookDetail book={currentBook} theme={theme} />}

          <footer className="app-footer">
            <p>© {new Date().getFullYear()} BookLovers Hub</p>
          </footer>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

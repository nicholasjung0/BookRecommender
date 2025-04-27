import React, { useState, useEffect } from 'react';

const BookRecommendation = ({ 
  userPreferences, 
  setUserPreferences, 
  getRecommendations, 
  bookRecommendations,
  allRecommendations,
  showAllRecommendations,
  toggleShowAll,
  theme
}) => {
  const [genreInput, setGenreInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [showPreferences, setShowPreferences] = useState(true);

  useEffect(() => {
    getRecommendations();
  }, [userPreferences]);

  const handleAddGenre = () => {
    if (genreInput.trim() !== '') {
      setUserPreferences(prev => ({
        ...prev,
        favoriteGenres: [...new Set([...prev.favoriteGenres, genreInput.trim()])],
      }));
      setGenreInput('');
    }
  };

  const handleAddAuthor = () => {
    if (authorInput.trim() !== '') {
      setUserPreferences(prev => ({
        ...prev,
        favoriteAuthors: [...new Set([...prev.favoriteAuthors, authorInput.trim()])],
      }));
      setAuthorInput('');
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.filter(genre => genre !== genreToRemove),
    }));
  };

  const handleRemoveAuthor = (authorToRemove) => {
    setUserPreferences(prev => ({
      ...prev,
      favoriteAuthors: prev.favoriteAuthors.filter(author => author !== authorToRemove),
    }));
  };

  const handleResetPreferences = () => {
    setUserPreferences({ favoriteGenres: [], favoriteAuthors: [] });
  };

  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      type === 'genre' ? handleAddGenre() : handleAddAuthor();
    }
  };

  return (
    <div className="recommendation-container">
      <h2>Book Recommendations</h2>
      
      <button 
        onClick={() => setShowPreferences(!showPreferences)}
        className="toggle-preferences"
      >
        {showPreferences ? 'Hide Preferences' : 'Show Preferences'}
      </button>
      
      {showPreferences && (
        <div className="preference-inputs">
          <div className="input-group">
            <input
              type="text"
              value={genreInput}
              onChange={(e) => setGenreInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'genre')}
              placeholder="Add a favorite genre (e.g. Fiction, Science)"
            />
            <button onClick={handleAddGenre}>Add Genre</button>
          </div>
          
          <div className="input-group">
            <input
              type="text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'author')}
              placeholder="Add a favorite author (e.g. Tolkien, Rowling)"
            />
            <button onClick={handleAddAuthor}>Add Author</button>
          </div>
          
          <div className="current-preferences">
            <h4>Your Current Preferences</h4>
            <div className="preference-list">
              <strong>Favorite Genres:</strong>
              {userPreferences.favoriteGenres.length > 0 ? (
                <ul>
                  {userPreferences.favoriteGenres.map((genre, index) => (
                    <li key={`genre-${index}`}>
                      {genre}
                      <button 
                        onClick={() => handleRemoveGenre(genre)}
                        className="remove-btn"
                        aria-label={`Remove ${genre}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : <p className="no-preferences">No genres selected</p>}
            </div>
            
            <div className="preference-list">
              <strong>Favorite Authors:</strong>
              {userPreferences.favoriteAuthors.length > 0 ? (
                <ul>
                  {userPreferences.favoriteAuthors.map((author, index) => (
                    <li key={`author-${index}`}>
                      {author}
                      <button 
                        onClick={() => handleRemoveAuthor(author)}
                        className="remove-btn"
                        aria-label={`Remove ${author}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : <p className="no-preferences">No authors selected</p>}
            </div>
          </div>
          
          <button 
            onClick={handleResetPreferences}
            className="reset-btn"
          >
            Reset All Preferences
          </button>
        </div>
      )}
      
      <div className="recommendation-results">
        <button 
          onClick={getRecommendations}
          className="recommendation-btn"
        >
          Refresh Recommendations
        </button>
        
        <h3>Your Personal Recommendations</h3>
        {bookRecommendations.length > 0 ? (
          <>
            <div className="recommendation-count">
              Showing {showAllRecommendations ? 'all' : 'top 10'} of {allRecommendations.length} recommendations
            </div>
            <ul className="recommendation-list">
              {bookRecommendations.map((rec) => (
                <li key={rec.id} className="recommendation-card">
                  <div className="book-info">
                    <strong>{rec.title}</strong> 
                    <span className="book-author">by {rec.author}</span>
                  </div>
                  {rec.score > 0 && (
                    <div className="match-info">
                      <span className="match-score">Match: {rec.score}</span>
                      {rec.score >= 3 && (
                        <span className="match-label">Great match!</span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {allRecommendations.length > 10 && (
              <div className="recommendation-controls">
                <button 
                  onClick={toggleShowAll}
                  className="show-more-btn"
                >
                  {showAllRecommendations 
                    ? 'Show Top 10 Only' 
                    : `Show All ${allRecommendations.length} Recommendations`}
                </button>
                {showAllRecommendations && (
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="scroll-top-btn"
                  >
                    Back to Top
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="no-recommendations">
            {userPreferences.favoriteGenres.length > 0 || userPreferences.favoriteAuthors.length > 0
              ? "No books match your current preferences. Try adjusting your preferences."
              : "No preferences set. Add some genres or authors for better recommendations."}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookRecommendation;

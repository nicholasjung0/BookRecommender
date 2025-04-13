// File: client/src/components/BookRecommendationPage.jsx

import React from 'react';
import BookRecommendation from './BookRecommendation';

const BookRecommendationPage = ({ userPreferences, setUserPreferences, getRecommendations, bookRecommendations }) => {
  return (
    <div>
      <h1>Book Recommendations</h1>
      <BookRecommendation
        userPreferences={userPreferences}
        setUserPreferences={setUserPreferences}
        getRecommendations={getRecommendations}
        bookRecommendations={bookRecommendations}
      />
    </div>
  );
};

export default BookRecommendationPage;
// File: BookRecommendation.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookRecommendation from './BookRecommendation';

// Test 1: Does the component show up at all
test('shows the Book Recommendations title', () => {
  render(
    <BookRecommendation
      userPreferences={{ favoriteGenres: [], favoriteAuthors: [] }}
      setUserPreferences={() => {}}
      getRecommendations={() => {}}
      bookRecommendations={[]}
    />
  );
  
  expect(screen.getByText('Book Recommendations')).toBeInTheDocument();
});

// Test 2: Can we see the input fields and buttons
test('has all the input fields and buttons', () => {
  render(
    <BookRecommendation
      userPreferences={{ favoriteGenres: [], favoriteAuthors: [] }}
      setUserPreferences={() => {}}
      getRecommendations={() => {}}
      bookRecommendations={[]}
    />
  );
  
  expect(screen.getByPlaceholderText('Add a favorite genre')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Add a favorite author')).toBeInTheDocument();
  expect(screen.getByText('Add Genre')).toBeInTheDocument();
  expect(screen.getByText('Add Author')).toBeInTheDocument();
  expect(screen.getByText('Reset Preferences')).toBeInTheDocument();
  expect(screen.getByText('Get Recommendations')).toBeInTheDocument();
});

// Test 3: Does adding a genre work
test('lets you add a genre', () => {
  const mockSetPreferences = jest.fn();
  
  render(
    <BookRecommendation
      userPreferences={{ favoriteGenres: [], favoriteAuthors: [] }}
      setUserPreferences={mockSetPreferences}
      getRecommendations={() => {}}
      bookRecommendations={[]}
    />
  );
  
  // Type "Fantasy" into the genre input
  const genreInput = screen.getByPlaceholderText('Add a favorite genre');
  fireEvent.change(genreInput, { target: { value: 'Fantasy' } });
  
  // Click the Add Genre button
  const addButton = screen.getByText('Add Genre');
  fireEvent.click(addButton);
  
  // Check if setUserPreferences was called correctly
  expect(mockSetPreferences).toHaveBeenCalledWith({
    favoriteGenres: ['Fantasy'],
    favoriteAuthors: []
  });
});

// Test 4: Does adding an author work
test('lets you add an author', () => {
  const mockSetPreferences = jest.fn();
  
  render(
    <BookRecommendation
      userPreferences={{ favoriteGenres: [], favoriteAuthors: [] }}
      setUserPreferences={mockSetPreferences}
      getRecommendations={() => {}}
      bookRecommendations={[]}
    />
  );
  
  // Type "J.K. Rowling" into the author input
  const authorInput = screen.getByPlaceholderText('Add a favorite author');
  fireEvent.change(authorInput, { target: { value: 'J.K. Rowling' } });
  
  // Click the Add Author button
  const addButton = screen.getByText('Add Author');
  fireEvent.click(addButton);
  
  // Check if setUserPreferences was called correctly
  expect(mockSetPreferences).toHaveBeenCalledWith({
    favoriteGenres: [],
    favoriteAuthors: ['J.K. Rowling']
  });
});

// Test 5: Does the reset button work
test('reset button clears preferences', () => {
  const mockSetPreferences = jest.fn();
  
  render(
    <BookRecommendation
      userPreferences={{ 
        favoriteGenres: ['Fantasy', 'Sci-Fi'], 
        favoriteAuthors: ['Tolkien'] 
      }}
      setUserPreferences={mockSetPreferences}
      getRecommendations={() => {}}
      bookRecommendations={[]}
    />
  );
  
  // Click the Reset button
  const resetButton = screen.getByText('Reset Preferences');
  fireEvent.click(resetButton);
  
  // Check if setUserPreferences was called with empty arrays
  expect(mockSetPreferences).toHaveBeenCalledWith({
    favoriteGenres: [],
    favoriteAuthors: []
  });
});

// Test 6: Does it show book recommendations
test('shows book recommendations', () => {
  const testRecommendations = [
    { title: 'Harry Potter', author: 'J.K. Rowling' },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien' }
  ];
  
  render(
    <BookRecommendation
      userPreferences={{ favoriteGenres: [], favoriteAuthors: [] }}
      setUserPreferences={() => {}}
      getRecommendations={() => {}}
      bookRecommendations={testRecommendations}
    />
  );
  
  // Check if both books appear
  expect(screen.getByText('Harry Potter')).toBeInTheDocument();
  expect(screen.getByText('The Hobbit')).toBeInTheDocument();
  expect(screen.getByText('by J.K. Rowling')).toBeInTheDocument();
  expect(screen.getByText('by J.R.R. Tolkien')).toBeInTheDocument();
});

// Test 7: Does the Get Recommendations button work
test('get recommendations button works', () => {
  const mockGetRecs = jest.fn();
  
  render(
    <BookRecommendation
      userPreferences={{ favoriteGenres: [], favoriteAuthors: [] }}
      setUserPreferences={() => {}}
      getRecommendations={mockGetRecs}
      bookRecommendations={[]}
    />
  );
  
  // Click the button
  const recButton = screen.getByText('Get Recommendations');
  fireEvent.click(recButton);
  
  // Check if the function was called
  expect(mockGetRecs).toHaveBeenCalled();
});
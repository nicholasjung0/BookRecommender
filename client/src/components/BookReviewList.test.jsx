import React from 'react';
import { render, screen } from '@testing-library/react';
import BookReviewList from './BookReviewList'; // Adjust the path if necessary

describe('BookReviewList Component', () => {
  const book = {
    id: '1',
    volumeInfo: {
      title: 'Test Book Title',
    },
  };

  const reviews = {
    '1': [
      {
        username: 'User1',
        rating: 4,
        text: 'Great book!',
      },
      {
        username: 'User2',
        rating: 5,
        text: 'I loved it!',
      },
    ],
  };

  test('renders the book title', () => {
    render(<BookReviewList book={book} reviews={reviews} />);
    expect(screen.getByText(/reviews for test book title/i)).toBeInTheDocument();
  });

  test('displays reviews if they exist', () => {
    render(<BookReviewList book={book} reviews={reviews} />);
    
    expect(screen.getByText(/great book!/i)).toBeInTheDocument();
    expect(screen.getByText(/i loved it!/i)).toBeInTheDocument();
  });

  test('shows no reviews message when there are no reviews', () => {
    render(<BookReviewList book={book} reviews={{}} />);
    
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });

  test('handles cases with no book passed', () => {
    render(<BookReviewList book={null} reviews={reviews} />);
    
    expect(screen.getByText(/reviews for this book/i)).toBeInTheDocument();
    expect(screen.getByText(/no reviews yet/i)).toBeInTheDocument();
  });
});
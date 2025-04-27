// File: client/src/components/BookSearchPage.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookSearchPage from './BookSearchPage';
import '@testing-library/jest-dom/extend-expect';

// Mock child components: SearchBar and BookList
jest.mock('./SearchBar', () => ({ onSearchResults }) => (
  <button onClick={() => onSearchResults([{ id: '1', title: 'Test Book' }])}>Mock Search</button>
));

jest.mock('./BookList', () => ({ books, onSelectBook }) => (
  <div>
    {books.map(book => (
      <div key={book.id} data-testid="book-item" onClick={() => onSelectBook(book)}>
        {book.title}
      </div>
    ))}
  </div>
));

describe('BookSearchPage', () => {
  it('renders heading', () => {
    render(<BookSearchPage onSearchResults={jest.fn()} onSelectBook={jest.fn()} />);
    expect(screen.getByText('Book Search')).toBeInTheDocument();
  });

  it('calls onSearchResults and displays books when search is triggered', () => {
    const mockOnSearchResults = jest.fn();
    const mockOnSelectBook = jest.fn();

    render(<BookSearchPage onSearchResults={mockOnSearchResults} onSelectBook={mockOnSelectBook} />);

    // Click the "Mock Search" button to simulate a search
    fireEvent.click(screen.getByText('Mock Search'));

    // Should call parent's onSearchResults
    expect(mockOnSearchResults).toHaveBeenCalledWith([{ id: '1', title: 'Test Book' }]);

    // Should render book from mocked BookList
    expect(screen.getByTestId('book-item')).toBeInTheDocument();
    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });

  it('calls onSelectBook when a book is clicked', () => {
    const mockOnSearchResults = jest.fn();
    const mockOnSelectBook = jest.fn();

    render(<BookSearchPage onSearchResults={mockOnSearchResults} onSelectBook={mockOnSelectBook} />);

    // Trigger search to populate books
    fireEvent.click(screen.getByText('Mock Search'));

    // Click on the book item
    fireEvent.click(screen.getByTestId('book-item'));

    expect(mockOnSelectBook).toHaveBeenCalledWith({ id: '1', title: 'Test Book' });
  });
});

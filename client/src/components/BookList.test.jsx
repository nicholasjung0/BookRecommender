import { render, screen } from '@testing-library/react';
import BookList from './BookList';

test('renders a list of books', () => {
    const books = [
        {
            id: '1',
            volumeInfo: {
                title: 'Book 1',
                authors: ['Author 1']
            }
        },
        {
            id: '2',
            volumeInfo: {
                title: 'Book 2',
                authors: ['Author 2']
            }
        }
    ];

    render(<BookList books={books} onSelectBook={() => {}} />);
    expect(screen.getByText('Book 1 - Author 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2 - Author 2')).toBeInTheDocument();
});

test('renders "No books found" message when no books are provided', () => {
    render(<BookList books={[]} onSelectBook={() => {}} />);
    expect(screen.getByText('No books found. Try another search?')).toBeInTheDocument();
});
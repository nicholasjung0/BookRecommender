import { render, screen } from '@testing-library/react';
import BookDetail from './BookDetail';

test('renders book details when a book is provided', () => {
    const book = {
        volumeInfo: {
            title: 'Test Book',
            authors: ['Author 1'],
            description: 'This is a test book.',
            publisher: 'Test Publisher',
            publishedDate: '2023-01-01',
            imageLinks: { thumbnail: 'http://test.com/image.jpg' }
        }
    };

    render(<BookDetail book={book} />);
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test book.')).toBeInTheDocument();
    expect(screen.getByText('Publisher: Test Publisher')).toBeInTheDocument();
    expect(screen.getByText('Published Date: 2023-01-01')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://test.com/image.jpg');
});

test('renders "No book selected" message when no book is provided', () => {
    render(<BookDetail book={null} />);
    expect(screen.getByText('Select a book to see details.')).toBeInTheDocument();
});
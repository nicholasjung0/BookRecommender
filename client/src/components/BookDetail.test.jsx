import { render, screen, within } from '@testing-library/react';
import BookDetail from './BookDetail';
import { act } from 'react';  // Fixed deprecated act import

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

    // Basic text checks
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('This is a test book.')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://test.com/image.jpg');

    // Use within to match specific elements more precisely
    const publisherParagraph = screen.getByText(/Publisher:/).closest('p');
    expect(within(publisherParagraph).getByText(/Publisher:/)).toBeInTheDocument();
    expect(within(publisherParagraph).getByText('Test Publisher')).toBeInTheDocument();

    const dateParagraph = screen.getByText(/Published Date:/).closest('p');
    expect(within(dateParagraph).getByText(/Published Date:/)).toBeInTheDocument();
    expect(within(dateParagraph).getByText('2023-01-01')).toBeInTheDocument();
});

test('renders "Select a book to see details." message when no book is provided', () => {
    render(<BookDetail book={null} />);
    expect(screen.getByText('Select a book to see details.')).toBeInTheDocument();
});

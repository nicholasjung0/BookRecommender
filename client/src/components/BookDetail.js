import React from 'react';
import './BookDetail.css'; // Import external CSS for styling

const BookDetail = ({ book }) => {
    if (!book) {
        return <p className="no-book-message">Select a book to see details.</p>;
    }

    const { title, authors, description, imageLinks, publisher, publishedDate } = book.volumeInfo || {};

    return (
        <div className="book-detail">
            <h2>{title}</h2>
            {imageLinks?.thumbnail && <img src={imageLinks.thumbnail} alt={title} className="book-image" />}
            <h3>{authors && authors.length ? authors.join(", ") : "Unknown Author"}</h3>
            <p><strong>Publisher:</strong> {publisher || "N/A"}</p>
            <p><strong>Published Date:</strong> {publishedDate || "N/A"}</p>
            <p><strong>Description:</strong> {description || "No description available."}</p>
        </div>
    );
};

export default BookDetail;

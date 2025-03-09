// File located in client/src/components/BookDetail.jsx

import React from 'react';
import './BookDetail.css';

function BookDetail(props) {
    if (!props.book) {
        return <p className="no-book-message">Select a book to see details.</p>;
    }

    let title = props.book.volumeInfo.title || "No title available";
    let authors = props.book.volumeInfo.authors ? props.book.volumeInfo.authors.join(", ") : "Unknown Author";
    let description = props.book.volumeInfo.description || "No description available.";
    let publisher = props.book.volumeInfo.publisher || "N/A";
    let publishedDate = props.book.volumeInfo.publishedDate || "N/A";
    let image = props.book.volumeInfo.imageLinks?.thumbnail || "";
    let amazonSearchLink = `https://www.amazon.com/s?k=${encodeURIComponent(title)}`;

    return (
        <div className="book-detail">
            <h2>{title}</h2>
            {image && <img src={image} alt={title} className="book-image" />}
            <h3>{authors}</h3>
            <p><b>Publisher:</b> {publisher}</p>
            <p><b>Published Date:</b> {publishedDate}</p>
            <p><b>Description:</b> {description}</p>
            <a href={amazonSearchLink} target="_blank" rel="noopener noreferrer" className="amazon-link">
                Buy on Amazon
            </a>
        </div>
    );
}

export default BookDetail;
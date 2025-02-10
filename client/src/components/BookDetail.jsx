// File located in client/src/components/BookDetail.jsx

import React from 'react';
import './BookDetail.css';

function BookDetail(props) {  
    if (!props.book) {
        return <p class="no-book-message">Select a book to see details.</p>;
    } // No book selected

    // All book details listed
    var title = props.book.volumeInfo.title;
    var authors = props.book.volumeInfo.authors;
    var description = props.book.volumeInfo.description;
    var imageLinks = props.book.volumeInfo.imageLinks;
    var publisher = props.book.volumeInfo.publisher;
    var publishedDate = props.book.volumeInfo.publishedDate;

    // Author of book
    var authorText;
    if (authors && authors.length > 0) {
        authorText = authors.join(", ");
    } else {
        authorText = "Unknown Author";
    }

    // Generate book image
    var bookImage;
    if (imageLinks && imageLinks.thumbnail) {
        bookImage = <img src={imageLinks.thumbnail} alt={title} class="book-image" />;
    }

    // Output information to webpage via HTML
    return (
        <div class="book-detail">
            <h2>{title}</h2>
            {bookImage}
            <h3>{authorText}</h3>
            <p><b>Publisher:</b> {publisher ? publisher : "N/A"}</p>
            <p><b>Published Date:</b> {publishedDate ? publishedDate : "N/A"}</p> 
            <p><b>Description:</b> {description ? description : "No description available."}</p>
        </div>
    );
}

export default BookDetail;

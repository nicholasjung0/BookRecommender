import React from 'react';
import './BookDetail.css';

function BookDetail(props) {  
    if (!props.book) {
        return <p class="no-book-message">Select a book to see details.</p>;
    }

    var title = props.book.volumeInfo.title;
    var authors = props.book.volumeInfo.authors;
    var description = props.book.volumeInfo.description;
    var imageLinks = props.book.volumeInfo.imageLinks;
    var publisher = props.book.volumeInfo.publisher;
    var publishedDate = props.book.volumeInfo.publishedDate;

    var authorText;
    if (authors && authors.length > 0) {
        authorText = authors.join(", ");
    } else {
        authorText = "Unknown Author";
    }

    var bookImage;
    if (imageLinks && imageLinks.thumbnail) {
        bookImage = <img src={imageLinks.thumbnail} alt={title} class="book-image" />;
    }

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

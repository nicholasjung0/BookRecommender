// File: client/src/components/BookReviewList.jsx

import React, { useState, useEffect } from 'react';

function BookReviewList({ book, reviews }) {
    const [bookReviews, setBookReviews] = useState([]);

    useEffect(() => {
        if (book && reviews[book.id]) {
            setBookReviews([reviews[book.id]]);
        } else {
            setBookReviews([]);
        }
    }, [book, reviews]);

    return (
        <div>
            <h3>Reviews for {book ? book.volumeInfo.title : 'this book'}</h3>
            {bookReviews.length > 0 ? (
                <ul>
                    {bookReviews.map((review, index) => (
                        <li key={index}>
                            <div>User: {review.username}</div>
                            <div>Rating: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                            <div>{review.text}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
}

export default BookReviewList;

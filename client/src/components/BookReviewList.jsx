// File: client/src/components/BookReviewList.jsx

import React, { useState, useEffect } from 'react';

function BookReviewList({ bookTitle }) {
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem('userReviews')) || {};
        setReviews(savedReviews);
    }, []);

    return (
        <div>
            <h3>Reviews for {bookTitle || 'this book'}</h3>
            <ul>
                {reviews[bookTitle] ? <li>{reviews[bookTitle]}</li> : <li>No reviews yet.</li>}
            </ul>
        </div>
    );
}

export default BookReviewList;
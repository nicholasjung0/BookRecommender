// File located in client/src/components/ReviewSubmission.jsx

import React, { useState } from 'react';

function ReviewSubmission({ book }) {
    const [reviewText, setReviewText] = useState('');

    function handleTextChange(event) {
        setReviewText(event.target.value);
    }

    function saveReviewText() {
        const allReviews = JSON.parse(localStorage.getItem('reviews')) || {};
        const updatedReviews = {
            ...allReviews,
            [book.title]: reviewText
        };
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    }

    return (
        <div>
            <h3>Write your Review</h3>
            <textarea value={reviewText} onChange={handleTextChange}></textarea>
            <button onClick={saveReviewText}>Save Review</button>
        </div>
    );
}

export default ReviewSubmission;
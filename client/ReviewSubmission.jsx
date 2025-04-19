// File located in client/src/components/ReviewSubmission.jsx

import React, { useState } from 'react';

function ReviewSubmission({ book, onSaveReview, username }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    function handleTextChange(event) {
        setReviewText(event.target.value);
    }

    function handleRatingChange(newRating) {
        setRating(newRating);
    }

    function saveReviewText() {
        if (book) {
            onSaveReview(book, reviewText, rating);
            setReviewText('');
            setRating(0);
        }
    }

    return (
        <div>
            {book ? (
                <>
                    <h3>Write your Review for {book.volumeInfo.title}</h3>
                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= rating ? "star-filled" : "star-empty"}
                                onClick={() => handleRatingChange(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea 
                        value={reviewText} 
                        onChange={handleTextChange} 
                        placeholder="Write your review here..."
                    />
                    <button onClick={saveReviewText}>Save Review</button>
                </>
            ) : (
                <p>Select a book to write a review.</p>
            )}
        </div>
    );
}

export default ReviewSubmission;
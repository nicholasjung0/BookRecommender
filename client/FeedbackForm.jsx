// File: client/src/components/FeedbackForm.jsx

import React, { useState } from 'react';
import './FeedbackForm.css';

function FeedbackForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && message) {
            const mailtoLink = `mailto:nicholasjung0@gmail.com?subject=Feedback from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)}`;
            window.location.href = mailtoLink;
            setSubmitted(true);
            setName('');
            setEmail('');
            setMessage('');
        }
    };

    return (
        <div className="feedback-form-container">
            <h2>Feedback</h2>
            {submitted ? (
                <p>Thank you for your feedback!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Feedback</button>
                </form>
            )}
        </div>
    );
}

export default FeedbackForm;
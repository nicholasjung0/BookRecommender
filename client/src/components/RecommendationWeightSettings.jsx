// File located in client/src/components/RecommendationWeightSettings.jsx

import React, { useState } from 'react';

const RecommendationWeightSettings = ({ onWeightsChange }) => {
  const [genreWeight, setGenreWeight] = useState(0.4);
  const [ratingWeight, setRatingWeight] = useState(0.3);
  const [popularityWeight, setPopularityWeight] = useState(0.15);
  const [interactionWeight, setInteractionWeight] = useState(0.1);
  const [userRatingWeight, setUserRatingWeight] = useState(0.05);

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalWeight = parseFloat(genreWeight) + parseFloat(ratingWeight) + 
                        parseFloat(popularityWeight) + parseFloat(interactionWeight) + 
                        parseFloat(userRatingWeight);
    
    // Validate that weights sum up to 1
    if (Math.abs(totalWeight - 1) < 0.01) {
      onWeightsChange({
        genreWeight: parseFloat(genreWeight),
        ratingWeight: parseFloat(ratingWeight),
        popularityWeight: parseFloat(popularityWeight),
        interactionWeight: parseFloat(interactionWeight),
        userRatingWeight: parseFloat(userRatingWeight),
      });
    } else {
      alert("Weights must sum up to 1.");
    }
  };

  return (
    <div className="recommendation-weight-settings">
      <h2>Set Your Recommendation Weights</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Genre Weight:
            <input type="number" value={genreWeight} onChange={(e) => setGenreWeight(e.target.value)} step="0.01" min="0" max="1" required />
          </label>
        </div>
        <div>
          <label>
            Rating Weight:
            <input type="number" value={ratingWeight} onChange={(e) => setRatingWeight(e.target.value)} step="0.01" min="0" max="1" required />
          </label>
        </div>
        <div>
          <label>
            Popularity Weight:
            <input type="number" value={popularityWeight} onChange={(e) => setPopularityWeight(e.target.value)} step="0.01" min="0" max="1" required />
          </label>
        </div>
        <div>
          <label>
            Interaction Weight:
            <input type="number" value={interactionWeight} onChange={(e) => setInteractionWeight(e.target.value)} step="0.01" min="0" max="1" required />
          </label>
        </div>
        <div>
          <label>
            User Rating Weight:
            <input type="number" value={userRatingWeight} onChange={(e) => setUserRatingWeight(e.target.value)} step="0.01" min="0" max="1" required />
          </label>
        </div>
        <button type="submit">Save Weights</button>
      </form>
    </div>
  );
};

export default RecommendationWeightSettings;
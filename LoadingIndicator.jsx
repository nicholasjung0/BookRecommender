// File: client/src/components/LoadingIndicator.jsx

import React from 'react';

function LoadingIndicator({ isLoading }) {
    return isLoading ? <p>Loading...</p> : null;
}

export default LoadingIndicator;
// File: client/src/components/ErrorBoundary.jsx

import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong. Try again later.</h2>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
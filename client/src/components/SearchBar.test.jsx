// File located at client/src/components/SearchBar.test.jsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

// Mock the global fetch
global.fetch = jest.fn();

describe('SearchBar Component', () => {
    let onSearchResultsMock;

    beforeEach(() => {
        onSearchResultsMock = jest.fn();
        fetch.mockClear();
        jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock alert
    });

    afterEach(() => {
        window.alert.mockRestore();
    });

    test('renders input and button', () => {
        render(<SearchBar onSearchResults={onSearchResultsMock} />);

        expect(screen.getByPlaceholderText('Enter book name...')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    test('shows alert if search term is empty', () => {
        render(<SearchBar onSearchResults={onSearchResultsMock} />);

        fireEvent.click(screen.getByText('Search'));

        expect(window.alert).toHaveBeenCalledWith('Please enter something to search for!');
        expect(fetch).not.toHaveBeenCalled();
    });

    test('fetches books and calls onSearchResults', async () => {
        const fakeBooks = [{ id: '1', volumeInfo: { title: 'Test Book' } }];
        fetch.mockResolvedValueOnce({
            json: async () => ({ items: fakeBooks }),
        });

        render(<SearchBar onSearchResults={onSearchResultsMock} />);

        fireEvent.change(screen.getByPlaceholderText('Enter book name...'), { target: { value: 'Harry Potter' } });
        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(expect.stringContaining('Harry%20Potter'));
            expect(onSearchResultsMock).toHaveBeenCalledWith(fakeBooks);
        });
    });

    test('shows alert on fetch error', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch failed'));

        render(<SearchBar onSearchResults={onSearchResultsMock} />);

        fireEvent.change(screen.getByPlaceholderText('Enter book name...'), { target: { value: 'Error Test' } });
        fireEvent.click(screen.getByText('Search'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith('There was a problem. Please try again later.');
        });
    });
});

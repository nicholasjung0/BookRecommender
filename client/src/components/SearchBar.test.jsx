import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('calls onSearchResults when the search button is clicked', () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearchResults={mockSearch} />);

    const input = screen.getByPlaceholderText('Enter book name...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'React' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalled();
});
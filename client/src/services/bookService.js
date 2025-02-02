
import axios from 'axios';

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query) => {
	const response = await axios.get('${GOOGLE_BOOKS_API}?q=${query}');
	return response.data
};
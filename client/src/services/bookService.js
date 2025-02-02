import axios from 'axios';

var url = "https://www.googleapis.com/books/v1/volumes";

// Main API book search function
export function searchBooks(query) {
    return axios.get(url + "?q=" + query)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {});
}

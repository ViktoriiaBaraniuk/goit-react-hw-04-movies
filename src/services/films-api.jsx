const API_KEY = '9c31d470e0252b8e0db46e1a778d3bbe';
const BASE_URL = 'https://api.themoviedb.org/3';

function fetchTrendingMovies() {
  return fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Ooops, something went wrong!`));
    },
  );
}

function fetchSearchMovies(movieName) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${movieName}&page=1&include_adult=false`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ooops, something went wrong!`));
  });
}

function fetchMovieDetails(id) {
  return fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ooops, something went wrong!`));
  });
}

function fetchMovieCast(id) {
  return fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ooops, something went wrong!`));
  });
}

function fetchMovieReviews(id) {
  return fetch(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ooops, something went wrong!`));
  });
}

const api = {
  fetchTrendingMovies,
  fetchSearchMovies,
  fetchMovieDetails,
  fetchMovieCast,
  fetchMovieReviews,
};

export default api;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageLoader from '../components/Loader/Loader';
import Searchbar from '../components/Searchbar/Searchbar';
import MoviesList from '../components/MoviesList/MoviesList';
import filmsAPI from '../services/films-api';

export default function MoviesPage() {
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const location = useLocation();

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    moviesFinder(new URLSearchParams(location.search).get('query'));
  }, [location.search]);

  const moviesFinder = query => {
    filmsAPI
      .fetchSearchMovies(query)
      .then(searchMovies => {
        if (searchMovies.results.length !== 0) {
          setMoviesSearch(searchMovies.results);
          setStatus('resolved');
          return;
        }
        return Promise.reject(new Error(`Sorry. This movie was not found!`));
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  return (
    <main>
      <Searchbar />

      {status === 'pending' && <PageLoader />}
      <>{moviesSearch && <MoviesList movies={moviesSearch} />}</>
      {status === 'rejected' && <h1>{error.message}</h1>}
    </main>
  );
}

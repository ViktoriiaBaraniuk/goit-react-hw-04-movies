import { useState, useEffect } from 'react';
import PageLoader from '../components/Loader/Loader';
import filmsAPI from '../services/films-api';
import MoviesList from '../components/MoviesList/MoviesList';

export default function HomePage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setStatus('pending');

    filmsAPI
      .fetchTrendingMovies()
      .then(trendingMovies => {
        if (trendingMovies.results.length !== 0) {
          setMovies(trendingMovies.results);
          setStatus('resolved');
        }
        return;
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, []);

  return (
    <>
      {status === 'pending' && <PageLoader />}
      {status === 'rejected' && <h2> message={error.message}</h2>}
      {status === 'resolved' && <MoviesList movies={movies} />}
    </>
  );
}

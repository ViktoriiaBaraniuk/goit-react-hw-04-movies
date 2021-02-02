import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Route, useRouteMatch, Link } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import filmsAPI from '../../services/films-api';
import PageLoader from '../../components/Loader/Loader';
import s from './MovieDetailsPage.css';

const Cast = lazy(() =>
  import('../../components/Cast/Cast' /* webpackChunkName: "cast-view" */),
);
const Reviews = lazy(() =>
  import(
    '../../components/Reviews/Reviews' /* webpackChunkName: "reviews-view" */
  ),
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const oneFilmId = Number(movieId.slice(1));

  /* const oneFilmId = Number(movieId.replace(/[^0-9.-]+/g, '')); 
  Этот простой фрагмент заменит ничем все, что не является числом.

*/
  useEffect(() => {
    setStatus('pending');

    filmsAPI
      .fetchMovieDetails(oneFilmId)
      .then(setMovie, setStatus('resolved'))
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [oneFilmId]);

  return (
    movie && (
      <div>
        {status === 'pending' && <PageLoader />}

        {status === 'resolved' && (
          <>
            <MovieCard movie={movie} />

            <Suspense fallback={<PageLoader />}>
              <Link to={`${url}/cast`} className={s.details}>
                Cast
              </Link>
              <Link to={`${url}/reviews`} className={s.details}>
                Reviews
              </Link>
              <Route path={`${url}/cast`}>
                <Cast id={oneFilmId} />
              </Route>

              <Route path={`${url}/reviews`}>
                <Reviews id={oneFilmId} />
              </Route>
            </Suspense>
          </>
        )}
        {status === 'rejected' && <h1>{error.message}</h1>}
      </div>
    )
  );
}

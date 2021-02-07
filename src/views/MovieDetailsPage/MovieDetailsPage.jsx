import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  useRouteMatch,
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import filmsAPI from '../../services/films-api';
import PageLoader from '../../components/Loader/Loader';
import GoBackButton from '../../components/GoBackButton/GoBackButton';
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

  const history = useHistory();
  const location = useLocation();
  console.log('history', history);
  console.log('location', location);

  const backToPrevPage = () => {
    history.push(location?.state?.from ?? '/');
  };

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
            <GoBackButton onClick={backToPrevPage} />
            <MovieCard movie={movie} />

            <Suspense fallback={<PageLoader />}>
              <Link
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state.from },
                }}
                className={s.details}
              >
                Cast
              </Link>
              <Link
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state.from },
                }}
                className={s.details}
              >
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

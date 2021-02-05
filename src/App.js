import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
/* import HomePage from './views/HomePage'; */
/* import MoviesPage from './views/MoviesPage'; */
/* import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage'; */
/* import NotFoundView from './views/NotFoundView'; */
import PageLoader from './components/Loader/Loader';
import { ToastContainer } from 'react-toastify';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "homepage-view" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page-view" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page-view" */
  ),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "not-found-page-view" */),
);

export default function App() {
  return (
    <div className="App">
      <AppBar />

      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer position="top-left" />
    </div>
  );
}

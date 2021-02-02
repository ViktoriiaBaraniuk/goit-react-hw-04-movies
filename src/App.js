import { Switch, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage/MovieDetailsPage';
import NotFoundView from './views/NotFoundView';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className="App">
      <AppBar />

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

      <ToastContainer position="top-left" />
    </div>
  );
}

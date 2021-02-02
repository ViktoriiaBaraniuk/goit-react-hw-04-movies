import MovieListItem from '../MovieListItem/MovieListItem';
import PropTypes from 'prop-types';
import s from './MoviesList.module.css';

export default function MoviesList({ movies }) {
  return (
    <>
      <main className={s.main}>
        <ul className={s.list}>
          {movies.map(({ title, id, name, poster_path, vote_average }) => (
            <li key={id} className={s.item}>
              <MovieListItem
                id={id}
                title={title}
                name={name}
                path={poster_path}
                vote={vote_average}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

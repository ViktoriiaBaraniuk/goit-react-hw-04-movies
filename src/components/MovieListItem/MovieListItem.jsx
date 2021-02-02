import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './MovieListItem.module.css';

export default function MovieListItem({ id, title, name, path, vote }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  let pathname = url;
  if (url === '/') {
    pathname = url + 'movies';
  }
  return (
    <>
      <Link
        to={{
          pathname: `${pathname}/:${id}`,
          state: {
            from: location,
          },
        }}
      >
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${path}`}
            alt={title}
            width="100%"
            className={s.poster}
          />
          <div>
            <h2 className={s.title}>
              {title ? title : name}
              <span className={s.rating}>{vote}</span>
            </h2>
          </div>
        </div>
      </Link>
    </>
  );
}

MovieListItem.propTypes = {
  id: PropTypes.number.isRequired,
  vote: PropTypes.number.isRequired,
  path: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
};

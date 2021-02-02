import PropTypes from 'prop-types';
import s from './MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <>
      <div className={s.card}>
        <div className={s.image_card}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="{movie.title}"
              className={s.poster}
            />
          )}
        </div>
        <div className={s.wrapper}>
          <h2 className={s.name}>{movie.title}</h2>
          <table className={s.table_style}>
            <tbody>
              <tr>
                <td className={s.item_text}>Vote / Votes</td>
                <td>
                  <span>{movie.vote_average}</span>/
                  <span>{movie.vote_count}</span>
                </td>
              </tr>
              <tr>
                <td className={s.item_text}>Popularity</td>
                <td>{movie.popularity}</td>
              </tr>
              <tr>
                <td className={s.item_text}>Original Title</td>
                <td className={s.title}>{movie.original_title}</td>
              </tr>
              <tr>
                <td className={s.item_text}>Release date</td>
                <td>{movie.release_date}</td>
              </tr>
              {movie.genres && (
                <tr>
                  <td className={s.item_text}>Genre</td>
                  <td>
                    {movie.genres.map(({ name, id }) => (
                      <li key={id}>{name}</li>
                    ))}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p className={s.item_about}>About</p>
          <p className={s.description}>{movie.overview}</p>{' '}
        </div>
      </div>
    </>
  );
}
MovieCard.propTypes = {
  movie: PropTypes.any.isRequired,
};

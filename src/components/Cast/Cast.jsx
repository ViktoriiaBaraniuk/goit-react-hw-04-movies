import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CastList from '../CastList/CastList';
import PageLoader from '../Loader/Loader';
import filmsAPI from '../../services/films-api';

export default function Cast({ id }) {
  const [movieCasts, setMovieCasts] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    filmsAPI
      .fetchMovieCast(id)
      .then(movieCast => {
        if (movieCast.cast.length !== 0) {
          setMovieCasts(movieCast.cast);
          setStatus('resolved');
          return;
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [id]);

  return (
    <>
      {status === 'pending' && <PageLoader />}
      {status === 'resolved' && <CastList casts={movieCasts} />}

      {status === 'rejected' && <h1>{error.message}</h1>}
    </>
  );
}

Cast.propTypes = {
  id: PropTypes.number.isRequired,
};

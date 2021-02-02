import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReviewsCard from '../ReviewsCard/ReviewsCard';
import PageLoader from '../Loader/Loader';
import filmsAPI from '../../services/films-api';

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    filmsAPI
      .fetchMovieReviews(id)
      .then(movieReviews => {
        setReviews(movieReviews.results);
        setStatus('resolved');
        return;
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [id]);

  return (
    <>
      {status === 'pending' && <PageLoader />}

      {status === 'resolved' && reviews.length > 0 && (
        <ReviewsCard reviews={reviews} />
      )}

      {status === 'resolved' && reviews.length === 0 && (
        <h2>No reviews found</h2>
      )}

      {status === 'rejected' && <h1>{error.message}</h1>}
    </>
  );
}
Reviews.propTypes = {
  id: PropTypes.number.isRequired,
};

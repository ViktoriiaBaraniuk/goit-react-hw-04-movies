import PropTypes from 'prop-types';
import s from './ReviewsCard.module.css';

export default function ReviewsCard({ reviews }) {
  return (
    <ul className={s.list}>
      {reviews.map(review => (
        <li key={review.id} className={s.item}>
          <h2 className={s.title}>{review.author}</h2>
          <p className={s.text}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

ReviewsCard.propTypes = {
  reviews: PropTypes.array,
};

import PropTypes from 'prop-types';
import s from './CastList.module.css';

export default function CastList({ casts }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Actor/Actress</th>
        </tr>
      </thead>
      {casts.map((el, idx) => (
        <tbody key={`${el.id}_${idx}`}>
          <tr className={s.casts}>
            <td>{el.character}</td>
            <td>{el.original_name}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
CastList.propTypes = {
  casts: PropTypes.array.isRequired,
};

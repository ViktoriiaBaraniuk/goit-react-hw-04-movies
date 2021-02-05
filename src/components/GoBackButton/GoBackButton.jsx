import s from './GoBackButton.module.css';

export default function GoBackButton({ onClick }) {
  return (
    <button type="button" onClick={() => onClick()} className={s.button}>
      Go back
    </button>
  );
}

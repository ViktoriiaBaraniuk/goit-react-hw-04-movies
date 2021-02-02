import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import s from './Searchbar.module.css';

export default function Searcbar() {
  const [movieName, setMovieName] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleNameChange = e => {
    setMovieName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    history.push({
      ...location,
      search: `query=${e.target.form.movieName.value}`,
    });

    if (movieName.trim() === '') {
      toast.warning('Please fill in the search field!');
      return;
    }

    setMovieName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm}>
        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={movieName}
          name="movieName"
          id=""
          onChange={handleNameChange}
        />
        <button
          type="submit"
          className={s.SearchForm_button}
          onClick={handleSubmit}
        >
          <span className={s.SearchForm_button_label}>Search</span>
        </button>
      </form>
    </header>
  );
}

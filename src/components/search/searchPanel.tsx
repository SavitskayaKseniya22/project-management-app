import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useTypedSelector, RootState, useTypedDispatch } from '../../store';
import { searchSlice } from '../../store/slices/search.slice';

import './searchPanel.scss';

const SearchPanel = () => {
  const searchValue = useTypedSelector((state: RootState) => state.searchSlice.searchValue);
  const dispatch = useTypedDispatch();
  const { t, i18n } = useTranslation();

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchSlice.actions.updateSearchValue(e.target.value));
  };

  const handleSubmit = () => {
    //fetch results
    //open result page
  };

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <Link to="/search">
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
      </Link>

      <input
        type="text"
        placeholder={t('header.search')}
        value={searchValue}
        onChange={handleChangeSearchValue}
      />
    </form>
  );
};

export default SearchPanel;

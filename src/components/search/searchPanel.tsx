import { ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import { useTypedSelector, RootState, useTypedDispatch } from '../../store';
import { searchSlice } from '../../store/slices/search.slice';

import './searchPanel.scss';

const SearchPanel = () => {
  const intl = useIntl();
  const searchValue = useTypedSelector((state: RootState) => state.searchSlice.searchValue);
  const dispatch = useTypedDispatch();
  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchSlice.actions.updateSearchValue(e.target.value));
  };

  return (
    <label className="search-panel">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass" />
      </button>
      <input
        type="text"
        placeholder={intl.formatMessage({ id: 'header_search' })}
        value={searchValue}
        onChange={handleChangeSearchValue}
      />
    </label>
  );
};

export default SearchPanel;

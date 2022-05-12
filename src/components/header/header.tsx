import { ChangeEvent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { langSlice } from '../../store/slices/lang.slice';
import { searchSlice } from '../../store/slices/search.slice';

import './header.scss';

const PageHeader = () => {
  const [scroll, setScroll] = useState(window.pageYOffset);
  const intl = useIntl();

  const lang = useTypedSelector((state: RootState) => state.langSlice.lang);
  const searchValue = useTypedSelector((state: RootState) => state.searchSlice.searchValue);
  const dispatch = useTypedDispatch();

  window.onscroll = function () {
    setScroll(window.pageYOffset);
  };

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchSlice.actions.updateSearchValue(e.target.value));
  };

  const toggleLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(langSlice.actions.updateLang(e.target.value));
  };

  return (
    <header className={scroll > 120 ? 'header header-sticky' : 'header'}>
      <label className="header-search">
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

      <div className="header-language">
        <input
          type="radio"
          name="language"
          id="language-eng"
          value="ENGLISH"
          checked={lang === 'ENGLISH'}
          onChange={toggleLanguage}
        />
        <label htmlFor="language-eng" className="language-eng">
          En
        </label>
        <input
          type="radio"
          name="language"
          id="language-ru"
          value="RUSSIAN"
          checked={lang === 'RUSSIAN'}
          onChange={toggleLanguage}
        />
        <label htmlFor="language-ru" className="language-ru">
          Ru
        </label>
      </div>
      <button className="header-new-board">
        {scroll > 120 ? (
          <i className="fa-solid fa-folder-plus"></i>
        ) : (
          <FormattedMessage id="header_newBoard" defaultMessage="Create new board" />
        )}
      </button>

      <a href="/profile" className="header-edit">
        {scroll > 120 ? (
          <i className="fa-solid fa-user-pen"></i>
        ) : (
          <FormattedMessage id="header_edit" defaultMessage="Edit profile" />
        )}
      </a>
      <button className="header-logout">
        {scroll > 120 ? (
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        ) : (
          <FormattedMessage id="header_logout" defaultMessage="Log out" />
        )}
      </button>
    </header>
  );
};

export default PageHeader;

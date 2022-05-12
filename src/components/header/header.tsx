import { ChangeEvent, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { langSlice } from '../../store/slices/lang.slice';

import './header.scss';

const PageHeader = () => {
  const [scroll, setScroll] = useState(0);
  const intl = useIntl();

  const [searchValue, setSearchValue] = useState(window.localStorage.getItem('searchValue') || '');

  const dispatch = useTypedDispatch();
  const lang = useTypedSelector((state: RootState) => state.langSlice.lang);

  window.onscroll = function () {
    setScroll(window.pageYOffset);
  };

  useEffect(() => {
    window.localStorage.setItem('searchValue', searchValue);
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
          onChange={handleChange}
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

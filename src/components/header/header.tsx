import { ChangeEvent, useEffect, useState } from 'react';
import './header.scss';

const PageHeader = () => {
  const [scroll, setScroll] = useState(0);

  //вынести в глобал стейт значение языка и значение поиска

  const [searchValue, setSearchValue] = useState(window.localStorage.getItem('searchValue') || '');
  const [language, setLanguage] = useState('language-eng');

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
    setLanguage(e.target.value);
  };

  return (
    <header className={scroll > 120 ? 'header header-sticky' : 'header'}>
      <label className="header-search">
        <i className="fa-solid fa-magnifying-glass" />
        <input type="text" placeholder="search" value={searchValue} onChange={handleChange} />
      </label>

      <div className="header-language">
        <input
          type="radio"
          name="language"
          id="language-eng"
          value="language-eng"
          checked={language === 'language-eng'}
          onChange={toggleLanguage}
        />
        <label htmlFor="language-eng" className="language-eng">
          Eng
        </label>
        <input
          type="radio"
          name="language"
          id="language-ru"
          value="language-ru"
          checked={language === 'language-ru'}
          onChange={toggleLanguage}
        />
        <label htmlFor="language-ru" className="language-ru">
          Ru
        </label>
      </div>
      <button className="header-new-board">Create new board</button>

      <a href="/profile" className="header-edit">
        Edit profile
      </a>
      <button className="header-logout">Log out</button>
    </header>
  );
};

export default PageHeader;

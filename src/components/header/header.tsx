import { useState } from 'react';
import './header.scss';

const PageHeader = () => {
  const [scroll, setScroll] = useState(0);

  window.onscroll = function () {
    setScroll(window.pageYOffset);
  };
  return (
    <header className={scroll > 120 ? 'header header-sticky' : 'header'}>
      <label className="header-search">
        <i className="fa-solid fa-magnifying-glass" />
        <input type="text" placeholder="search" />
      </label>

      <div className="header-language">
        <input type="radio" name="language" id="language-eng" checked />
        <label htmlFor="language-eng" className="language-eng">
          Eng
        </label>
        <input type="radio" name="language" id="language-ru" />
        <label htmlFor="language-ru" className="language-ru">
          Ru
        </label>
      </div>
      <button className="header-new-board">Create new board</button>

      <button className="header-edit">Edit profile</button>
      <button className="header-logout">Log out</button>
    </header>
  );
};

export default PageHeader;

import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LanguagePanel from '../languagePanel/languagePanel';
import SearchPanel from '../search/searchPanel';
import './header.scss';

const PageHeader = () => {
  const [scroll, setScroll] = useState(window.pageYOffset);

  window.onscroll = function () {
    setScroll(window.pageYOffset);
  };

  return (
    <header className={scroll > 120 ? 'header header-sticky' : 'header'}>
      <SearchPanel />
      <LanguagePanel />
      {scroll < 120 ? (
        <>
          <button className="header-new-board">
            <FormattedMessage id="header_newBoard" defaultMessage="Create new board" />
          </button>
          <Link to="/profile" className="header-edit">
            <FormattedMessage id="header_edit" defaultMessage="Edit profile" />
          </Link>
          <button className="header-logout">
            <FormattedMessage id="header_logout" defaultMessage="Log out" />
          </button>
        </>
      ) : (
        <>
          <button className="header-new-board">
            <i className="fa-solid fa-folder-plus"></i>
          </button>
          <Link to="/profile" className="header-edit">
            <i className="fa-solid fa-user-pen"></i>
          </Link>
          <button className="header-logout">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </>
      )}
    </header>
  );
};

export default PageHeader;

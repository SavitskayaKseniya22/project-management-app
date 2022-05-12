import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
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

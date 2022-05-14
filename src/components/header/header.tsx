import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector, RootState } from '../../store';
import LanguagePanel from '../languagePanel/languagePanel';
import SearchPanel from '../search/searchPanel';
import './header.scss';

const PageHeader = () => {
  const [scroll, setScroll] = useState(window.pageYOffset);
  const accessToken = useTypedSelector((state: RootState) => state.authSlice.accessToken);
  const location = useLocation();

  window.onscroll = function () {
    setScroll(window.pageYOffset);
  };

  const headerNormal = (
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
  );

  const headerSticky = (
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
  );

  const headerWelcomeNormal = (
    <>
      <Link to="/signin" className="header-signin">
        <FormattedMessage id="header_signin" defaultMessage="Sign in" />
      </Link>
      <Link to="/signup" className="header-signup">
        <FormattedMessage id="header_signup" defaultMessage="Sign up" />
      </Link>
    </>
  );

  const headerWelcomeSticky = (
    <>
      <Link to="/signin" className="header-signin">
        <i className="fa-solid fa-arrow-right-to-bracket"></i>
      </Link>
      <Link to="/signup" className="header-signup">
        <i className="fa-solid fa-user-plus"></i>
      </Link>
    </>
  );

  const getHeaderContent = () => {
    if (accessToken) {
      if (location.pathname === '/') {
        return (
          <>
            <SearchPanel />
            <LanguagePanel />
            {scroll < 120 ? headerNormal : headerSticky}
            {scroll < 120 ? (
              <Link to="/main" className="header-go-main">
                <FormattedMessage id="header_goMain" defaultMessage="Go to Main Page" />
              </Link>
            ) : (
              <Link to="/main" className="header-go-main">
                <i className="fa-solid fa-list"></i>
              </Link>
            )}
          </>
        );
      } else {
        return (
          <>
            <SearchPanel />
            <LanguagePanel />
            {scroll < 120 ? headerNormal : headerSticky}
          </>
        );
      }
    } else {
      return scroll < 120 ? headerWelcomeNormal : headerWelcomeSticky;
    }
  };

  return (
    <header className={scroll > 120 ? 'header header-sticky' : 'header'}>
      {getHeaderContent()}
    </header>
  );
};

export default PageHeader;

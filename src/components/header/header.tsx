import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector, RootState, useTypedDispatch, authSlice } from '../../store';
import { getAccessTokenSelector } from '../../store/selectors';
import LanguagePanel from '../languagePanel/languagePanel';
import { ModalWindow } from '../modal-window/modal-window';
import SearchPanel from '../search/searchPanel';
import './header.scss';

const PageHeader = () => {
  const [scroll, setScroll] = useState(window.pageYOffset);
  const accessToken = useTypedSelector(getAccessTokenSelector);
  const location = useLocation();
  const dispatch = useTypedDispatch();

  const [boardFormOpen, setBoardFormOpen] = useState<boolean>(false);
  const toggleBoardForm = () => {
    setBoardFormOpen((boardFormOpen) => !boardFormOpen);
  };

  window.onscroll = function () {
    setScroll(window.pageYOffset);
  };

  const logoutHandler = () => {
    dispatch(authSlice.actions.updateAccessToken(''));
  };

  const headerNormal = (
    <>
      <SearchPanel />
      <LanguagePanel />
      <button className="header-new-board" onClick={toggleBoardForm}>
        <FormattedMessage id="header_newBoard" defaultMessage="Create new board" />
      </button>
      <Link to="/profile" className="header-edit">
        <FormattedMessage id="header_edit" defaultMessage="Edit profile" />
      </Link>
      <button className="header-logout" onClick={logoutHandler}>
        <FormattedMessage id="header_logout" defaultMessage="Log out" />
      </button>
      {boardFormOpen && (
        <ModalWindow
          reason="create a board"
          declineFunction={toggleBoardForm}
          confirmFunction={() => {
            return;
          }}
        ></ModalWindow>
      )}
    </>
  );

  const headerSticky = (
    <>
      <SearchPanel />
      <LanguagePanel />
      <button className="header-new-board" onClick={toggleBoardForm}>
        <i className="fa-solid fa-folder-plus"></i>
      </button>
      <Link to="/profile" className="header-edit">
        <i className="fa-solid fa-user-pen"></i>
      </Link>
      <button className="header-logout" onClick={logoutHandler}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
      {boardFormOpen && (
        <ModalWindow
          reason="create a board"
          declineFunction={toggleBoardForm}
          confirmFunction={() => {
            return;
          }}
        ></ModalWindow>
      )}
    </>
  );

  const headerWelcomeUnlogin = (
    <>
      <Link to="/signin" className="header-signin">
        <FormattedMessage id="header_signin" defaultMessage="Sign in" />
      </Link>
      <Link to="/signup" className="header-signup">
        <FormattedMessage id="header_signup" defaultMessage="Sign up" />
      </Link>
    </>
  );

  const headerWelcomeUnloginSticky = (
    <>
      <Link to="/signin" className="header-signin">
        <i className="fa-solid fa-arrow-right-to-bracket"></i>
      </Link>
      <Link to="/signup" className="header-signup">
        <i className="fa-solid fa-user-plus"></i>
      </Link>
    </>
  );

  const headerWelcomeLogin = (
    <>
      {headerNormal}
      <Link to="/main" className="header-go-main">
        <FormattedMessage id="header_goMain" defaultMessage="Go to Main Page" />
      </Link>
    </>
  );

  const headerWelcomeLoginSticky = (
    <>
      {headerSticky}
      <Link to="/main" className="header-go-main">
        <i className="fa-solid fa-list"></i>
      </Link>
    </>
  );

  const getHeaderContent = () => {
    if (accessToken) {
      if (location.pathname === '/') {
        return scroll < 120 ? headerWelcomeLogin : headerWelcomeLoginSticky;
      } else {
        return scroll < 120 ? headerNormal : headerSticky;
      }
    } else {
      return scroll < 120 ? headerWelcomeUnlogin : headerWelcomeUnloginSticky;
    }
  };

  return (
    <header className={scroll > 120 ? 'header header-sticky' : 'header'}>
      {getHeaderContent()}
    </header>
  );
};

export default PageHeader;

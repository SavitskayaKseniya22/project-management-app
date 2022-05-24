import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector, useTypedDispatch, authSlice } from '../../store';
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
  const { t } = useTranslation();

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
        {t('header.newBoard')}
      </button>
      <Link to="/profile" className="header-edit">
        {t('header.edit')}
      </Link>
      <button className="header-logout" onClick={logoutHandler}>
        {t('header.logout')}
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
      <LanguagePanel />
      <Link to="/signin" className="header-signin">
        {t('header.signin')}
      </Link>
      <Link to="/signup" className="header-signup">
        {t('header.signup')}
      </Link>
    </>
  );

  const headerWelcomeUnloginSticky = (
    <>
      <LanguagePanel />
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
        {t('header.goMain')}
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

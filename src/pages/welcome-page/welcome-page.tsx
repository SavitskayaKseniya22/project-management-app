import { useTranslation } from 'react-i18next';
import { getAccessTokenSelector, useTypedSelector } from '../../store';
import './welcome-page.scss';

export function WelcomePage() {
  const token = useTypedSelector(getAccessTokenSelector);
  const { t } = useTranslation();
  return (
    <div className="welcome-page">
      <h1>{t('welcomepage.welcome')}</h1>
      {token ? (
        <div className="buttons">
          <a href="/main" className="button-orange button-big">
            {' '}
            Go to main page
          </a>
        </div>
      ) : (
        <div className="buttons">
          <a href="/signin" className="button-orange button-big">
            {' '}
            Sign in
          </a>
          <a href="/signup" className="button-orange button-big">
            {' '}
            Sign up
          </a>
        </div>
      )}
      <div className="team-list">
        <div className="team-info">
          <h3>Name placeholder</h3>
          <img src="../../assets/jpg/The_Almighty_Loaf.jpg" alt="profile-pic" />
          <ul>
            <li>Something</li>
            <li>Something else</li>
            <li>etc</li>
          </ul>
        </div>
        <div className="team-info">
          <h3>Name placeholder</h3>
          <img src="../../assets/jpg/The_Almighty_Loaf.jpg" alt="profile-pic" />
          <ul>
            <li>Something</li>
            <li>Something else</li>
            <li>etc</li>
          </ul>
        </div>
        <div className="team-info">
          <h3>Name placeholder</h3>
          <img src="../../assets/jpg/The_Almighty_Loaf.jpg" alt="profile-pic" />
          <ul>
            <li>Something</li>
            <li>Something else</li>
            <li>etc</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

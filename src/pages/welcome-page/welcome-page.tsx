import { useTranslation } from 'react-i18next';
import './welcome-page.scss';
import profilePicNikita from '../../assets/jpg/The_Almighty_Loaf.jpg';
import profilePicVadim from '../../assets/jpg/vadim.jpg';
import profilePicKseniya from '../../assets/jpg/ava-2.jpg';
import organizePic from '../../assets/webp/organize-pic.webp';
import collabPic from '../../assets/png/collab-pic.png';
import trackPic from '../../assets/webp/track-pic.webp';
import planPic from '../../assets/png/plan-pic.png';

export function WelcomePage() {
  const { t } = useTranslation();
  return (
    <div className="welcome-page">
      <section className="welcome-section welcome-screen">
        <h1>{t('welcomepage.titles.main')}</h1>
      </section>

      <section className="welcome-section">
        <h2>{t('welcomepage.titles.features')}</h2>
        <div className="feature-list">
          <div className="main-feature">
            <div className="feature-symbol">
              <i className="fa-solid fa-users"></i>
            </div>

            <h3>{t('welcomepage.features.organize')}</h3>
            <img src={organizePic} alt="Organize your team" width="425" height="320" />
          </div>
          <div className="main-feature">
            <div className="feature-symbol">
              <i className="fa-solid fa-table"></i>
            </div>
            <h3>{t('welcomepage.features.plan')}</h3>
            <img
              src={planPic}
              alt="Plan projects and assign responsibility"
              width="425"
              height="320"
            />
          </div>

          <div className="main-feature">
            <div className="feature-symbol">
              <i className="fa-solid fa-music"></i>
            </div>
            <h3>{t('welcomepage.features.collaborate')}</h3>
            <img src={collabPic} alt="Collaborate efficiently" width="425" height="320" />
          </div>
          <div className="main-feature">
            <div className="feature-symbol">
              <i className="fa-solid fa-stopwatch"></i>
            </div>
            <h3>{t('welcomepage.features.track')}</h3>
            <img src={trackPic} alt="Track progress and deliver on time" width="425" height="320" />
          </div>
        </div>
      </section>
      <section className="welcome-section">
        <h2>{t('welcomepage.titles.team')}</h2>
        <div className="team-list">
          <div className="team-member-info">
            <a href="https://github.com/SavitskayaKseniya22" target="_blank" rel="noreferrer">
              <h3>{t('footer.nameKseniya')}</h3>
            </a>

            <img
              className="team-member-image"
              src={profilePicKseniya}
              alt="avatar"
              width="200"
              height="200"
            />
            <ul>
              <li>{t('welcomepage.responsibility.kseniya.1')}</li>
              <li>{t('welcomepage.responsibility.kseniya.2')}</li>
              <li>{t('welcomepage.responsibility.kseniya.3')}</li>
              <li>{t('welcomepage.responsibility.kseniya.4')}</li>
            </ul>
          </div>
          <div className="team-member-info">
            <a href="https://github.com/Nikita1814" target="_blank" rel="noreferrer">
              <h3>{t('footer.nameNikita')}</h3>
            </a>

            <img
              className="team-member-image"
              src={profilePicNikita}
              alt="avatar"
              width="200"
              height="200"
            />
            <ul>
              <li>
                <b>{t('welcomepage.responsibility.nikita.1')}</b>
              </li>
              <li>{t('welcomepage.responsibility.nikita.2')}</li>
              <li>{t('welcomepage.responsibility.nikita.3')}</li>
              <li>{t('welcomepage.responsibility.nikita.4')}</li>
            </ul>
          </div>
          <div className="team-member-info">
            <a href="https://github.com/ivp-dev" target="_blank" rel="noreferrer">
              <h3>{t('footer.nameVadim')}</h3>
            </a>

            <img
              className="team-member-image"
              src={profilePicVadim}
              alt="avatar"
              width="200"
              height="200"
            />
            <ul>
              <li>{t('welcomepage.responsibility.vadim.1')}</li>
              <li>{t('welcomepage.responsibility.vadim.2')}</li>
              <li>{t('welcomepage.responsibility.vadim.3')}</li>
              <li>{t('welcomepage.responsibility.vadim.4')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

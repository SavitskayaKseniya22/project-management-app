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
        <h1>Awesome project management app</h1>
      </section>

      <section className="welcome-section">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="main-feature">
            <div className="feature-symbol">
              <i className="fa-solid fa-users"></i>
            </div>

            <h3>Organize your team</h3>
            <img src={organizePic} alt="Organize your team" width="425" height="320" />
          </div>
          <div className="main-feature">
            <div className="feature-symbol">
              <i className="fa-solid fa-table"></i>
            </div>
            <h3>Plan projects and assign responsibility</h3>
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
            <h3>Collaborate efficiently</h3>
            <img src={collabPic} alt="Collaborate efficiently" width="425" height="320" />
          </div>
          <div className="main-feature">
            <div className="feature-symbol">
              <i className="fa-solid fa-stopwatch"></i>
            </div>
            <h3>Track progress and deliver on time</h3>
            <img src={trackPic} alt="Track progress and deliver on time" width="425" height="320" />
          </div>
        </div>
      </section>
      <section className="welcome-section">
        <h2> Meet the team</h2>
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
              <li>Design</li>
              <li>Header and footer</li>
              <li>Localisation</li>
              <li>Column creation and DND</li>
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
                <b>Team lead</b>
              </li>
              <li>Task creation and DND</li>
              <li>CI/CD</li>
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
              <li>Global store</li>
              <li>User creation</li>
              <li>Signup, signin</li>
              <li>Logout, login</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

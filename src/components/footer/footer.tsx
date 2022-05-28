import './footer.scss';
import logo from '../../assets/svg/rs-school-js.svg';
import { useTranslation } from 'react-i18next';

const PageFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-course-logo">
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          <img src={logo} alt="logo" width="100" />
        </a>
      </div>
      <div className="footer-git-links">
        <a
          className="footer-git-link"
          href="https://github.com/Nikita1814"
          target="_blank"
          rel="noreferrer"
        >
          {t('footer.nameNikita')}
        </a>
        <a
          className="footer-git-link"
          href="https://github.com/ivp-dev"
          target="_blank"
          rel="noreferrer"
        >
          {t('footer.nameVadim')}
        </a>
        <a
          className="footer-git-link"
          href="https://github.com/SavitskayaKseniya22"
          target="_blank"
          rel="noreferrer"
        >
          {t('footer.nameKseniya')}
        </a>
      </div>
      <span className="footer-copyright">&#169; 2022</span>
    </footer>
  );
};

export default PageFooter;

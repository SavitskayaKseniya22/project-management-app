import './footer.scss';
import logo from '../../assets/svg/rs-school-js.svg';
import { FormattedMessage } from 'react-intl';

const PageFooter = () => {
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
          <FormattedMessage id="footer_nameNikita" defaultMessage="Nikita Kravchenko" />
        </a>
        <a
          className="footer-git-link"
          href="https://github.com/ivp-dev"
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage id="footer_nameVadim" defaultMessage="Vadim Ilyinchik" />
        </a>
        <a
          className="footer-git-link"
          href="https://github.com/SavitskayaKseniya22"
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage id="footer_nameKseniya" defaultMessage="Kseniya Savitskaya" />
        </a>
      </div>
      <span className="footer-copyright">&#169; 2022</span>
    </footer>
  );
};

export default PageFooter;

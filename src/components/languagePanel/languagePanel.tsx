import i18next from 'i18next';
import './languagePanel.scss';

const LanguagePanel = () => {
  const toggleLanguage = () => {
    i18next.language === 'en' ? i18next.changeLanguage('ru') : i18next.changeLanguage('en');
  };

  return (
    <div className="language-panel">
      <input
        type="radio"
        name="language"
        id="language-eng"
        value="ENGLISH"
        checked={i18next.language === 'en'}
        onChange={toggleLanguage}
      />
      <label htmlFor="language-eng" className="language-eng">
        En
      </label>
      <input
        type="radio"
        name="language"
        id="language-ru"
        value="RUSSIAN"
        checked={i18next.language === 'ru'}
        onChange={toggleLanguage}
      />
      <label htmlFor="language-ru" className="language-ru">
        Ru
      </label>
    </div>
  );
};

export default LanguagePanel;

import { ChangeEvent } from 'react';
import { useTypedSelector, RootState, useTypedDispatch } from '../../store';
import { langSlice } from '../../store/slices/lang.slice';
import './languagePanel.scss';

const LanguagePanel = () => {
  const lang = useTypedSelector((state: RootState) => state.langSlice.lang);
  const dispatch = useTypedDispatch();

  const toggleLanguage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(langSlice.actions.updateLang(e.target.value));
  };

  return (
    <div className="language-panel">
      <input
        type="radio"
        name="language"
        id="language-eng"
        value="ENGLISH"
        checked={lang === 'ENGLISH'}
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
        checked={lang === 'RUSSIAN'}
        onChange={toggleLanguage}
      />
      <label htmlFor="language-ru" className="language-ru">
        Ru
      </label>
    </div>
  );
};

export default LanguagePanel;

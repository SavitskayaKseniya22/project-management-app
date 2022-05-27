import { useTranslation } from 'react-i18next';
import './not-found-page.scss';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <h2>{t('404')}</h2>
    </div>
  );
}

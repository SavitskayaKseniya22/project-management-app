import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'react-i18next';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { errorSlice } from '../../store/slices';
import './error-prompt.scss';

interface QueryError {
  data: { statusCode: number; message: string };
  status: number;
}
export function ErrorPropmt() {
  const err = useTypedSelector((state: RootState) => state.errorSlice.error) as QueryError | null;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const clearError = () => {
    dispatch(errorSlice.actions.updateError(null));
  };

  if (err && err.data) {
    return (
      <div className="page-overlay">
        <div className="error-msg">
          <h2>
            {t('error.title')} {err.status}
          </h2>
          <p>{JSON.stringify(err.data.message)}</p>
          <button onClick={clearError}>{t('error.confirm')}</button>
        </div>
      </div>
    );
  } else return <div className="hide-elem"></div>;
}

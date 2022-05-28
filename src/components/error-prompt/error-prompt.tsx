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

  const clearError = () => {
    dispatch(errorSlice.actions.updateError(null));
  };

  if (err && err.data) {
    return (
      <div className="page-overlay" onClick={clearError}>
        <div className="error-msg">
          <b>{err.status}:</b> {JSON.stringify(err.data.message)}
        </div>
      </div>
    );
  } else return <div className="hide-elem"></div>;
}

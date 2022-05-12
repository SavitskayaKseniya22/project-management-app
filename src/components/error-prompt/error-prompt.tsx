import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { errorSlice } from '../../store/slices';
import './error-prompt.scss';

export function ErrorPropmt() {
  const err = useTypedSelector(
    (state: RootState) => state.errorSlice.error
  ) as FetchBaseQueryError | null;

  const dispatch = useTypedDispatch();
  const clearError = () => {
    dispatch(errorSlice.actions.updateError(null));
  };

  if (err && err.status === 'FETCH_ERROR') {
    return (
      <div className="page-overlay">
        <div className="error-msg">
          <h2>A query error occured</h2>
          <p>{err.error}</p>
          <button onClick={clearError} className="button-orange error-button">
            Ok
          </button>
        </div>
      </div>
    );
  } else return <div className="hide-elem"></div>;
}

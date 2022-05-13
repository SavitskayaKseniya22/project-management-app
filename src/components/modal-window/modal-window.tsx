import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { errorSlice } from '../../store/slices';
import './error-prompt.scss';

interface ModalWindowProps {
  reason: string;
  confirmFunction: () => void;
  declineFunction: () => void;
}
export function ModalWindow(props: ModalWindowProps) {
  return (
    <div className="modal-page-overlay">
      <div className="modal-msg">
        <h2>Are you sure you want to {props.reason}</h2>
        <div className="buttons">
          <button onClick={props.declineFunction} className="button-orange modal-button">
            NO
          </button>
          <button onClick={props.confirmFunction} className="button-orange modal-button">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

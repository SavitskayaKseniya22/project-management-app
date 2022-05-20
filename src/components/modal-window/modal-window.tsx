import BoardCreationForm from '../board-creation-form/board-creation-form';
import ColumnCreationForm from '../column-creation-form/column-creation-form';
import TaskCreationForm from '../task-creation-form/task-creation-form';
import './modal-window.scss';

interface ModalWindowProps {
  reason: string;
  confirmFunction: () => void;
  declineFunction: () => void;
  optional?: {
    [val: string]: string;
  };
}
export function ModalWindow(props: ModalWindowProps) {
  if (props.reason === 'create a task' && props.optional && props.optional.colId) {
    return (
      <div className="modal-page-overlay">
        <div className="modal-msg">
          <div className="modal-form-top">
            <h2>{props.reason}</h2>{' '}
            <button className="button-orange" onClick={props.declineFunction}>
              X
            </button>{' '}
          </div>
          <TaskCreationForm colId={props.optional.colId}></TaskCreationForm>
        </div>
      </div>
    );
  } else if (props.reason === 'create a board') {
    return (
      <div className="modal-page-overlay">
        <div className="modal-msg">
          <div className="modal-form-top">
            <h2>{props.reason}</h2>{' '}
            <button className="button-orange" onClick={props.declineFunction}>
              X
            </button>{' '}
          </div>
          <BoardCreationForm></BoardCreationForm>
        </div>
      </div>
    );
  } else if (props.reason === 'create a column') {
    return (
      <div className="modal-page-overlay">
        <div className="modal-msg">
          <div className="modal-form-top">
            <h2>{props.reason}</h2>
            <button className="button-orange" onClick={props.declineFunction}>
              X
            </button>
          </div>
          <ColumnCreationForm declineFunction={props.declineFunction}></ColumnCreationForm>
        </div>
      </div>
    );
  }
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

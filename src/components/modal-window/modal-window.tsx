import { MouseEventHandler } from 'react';
import { TaskResponse } from '../../store/slices/types';
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
  task?: TaskResponse;
}
export function ModalWindow(props: ModalWindowProps) {
  if (props.reason === 'create a task' && props.optional && props.optional.columnId) {
    return (
      <div className="modal-page-overlay">
        <div className="modal-msg">
          <div className="modal-form-top">
            <button onClick={props.declineFunction}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <TaskCreationForm
            columnId={props.optional.columnId}
            closeFormFunction={props.declineFunction}
          ></TaskCreationForm>
        </div>
      </div>
    );
  } else if (
    props.reason === 'edit the task' &&
    props.optional &&
    props.optional.columnId &&
    props.task
  ) {
    return (
      <div className="modal-page-overlay">
        <div className="modal-msg">
          <div className="modal-form-top">
            <button onClick={props.declineFunction}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <TaskCreationForm
            columnId={props.optional.columnId}
            closeFormFunction={props.declineFunction}
            task={props.task}
          ></TaskCreationForm>
        </div>
      </div>
    );
  } else if (props.reason === 'create a board') {
    return (
      <div className="modal-page-overlay">
        <div className="modal-msg">
          <div className="modal-form-top">
            <button onClick={props.declineFunction}>
              <i className="fa-solid fa-xmark"></i>
            </button>
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
            <button onClick={props.declineFunction}>
              <i className="fa-solid fa-xmark"></i>
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
        <h3>Are you sure you want to {props.reason}</h3>
        <div className="buttons">
          <button onClick={props.declineFunction}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <button onClick={props.confirmFunction}>
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

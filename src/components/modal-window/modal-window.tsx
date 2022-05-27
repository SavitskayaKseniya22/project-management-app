import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { reason } = props;
  let reasonKey = 'task';

  if (reason === 'delete the task') {
    reasonKey = t('modal.task');
  } else if (reason === 'delete the column') {
    reasonKey = t('modal.column');
  } else if (reason === 'delete this board') {
    reasonKey = t('modal.board');
  }

  const decline = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    props.declineFunction();
  };

  if (reason === 'create a task' && props.optional && props.optional.columnId) {
    return (
      <div className="modal-page-overlay" onClick={decline}>
        <div className="modal-msg modal-msg-form">
          <button className="modal-msg-button-close" onClick={props.declineFunction}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <TaskCreationForm
            columnId={props.optional.columnId}
            closeFormFunction={props.declineFunction}
          ></TaskCreationForm>
        </div>
      </div>
    );
  } else if (
    reason === 'edit the task' &&
    props.optional &&
    props.optional.columnId &&
    props.task
  ) {
    return (
      <div className="modal-page-overlay" onClick={decline}>
        <div className="modal-msg modal-msg-form">
          <button className="modal-msg-button-close" onClick={props.declineFunction}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <TaskCreationForm
            columnId={props.optional.columnId}
            closeFormFunction={props.declineFunction}
            task={props.task}
          ></TaskCreationForm>
        </div>
      </div>
    );
  } else if (reason === 'create a board') {
    return (
      <div className="modal-page-overlay" onClick={decline}>
        <div className="modal-msg modal-msg-form">
          <button className="modal-msg-button-close" onClick={props.declineFunction}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <BoardCreationForm declineFunction={props.declineFunction}></BoardCreationForm>
        </div>
      </div>
    );
  } else if (reason === 'create a column') {
    return (
      <div className="modal-page-overlay" onClick={decline}>
        <div className="modal-msg modal-msg-form">
          <button className="modal-msg-button-close" onClick={props.declineFunction}>
            <i className="fa-solid fa-xmark"></i>
          </button>

          <ColumnCreationForm declineFunction={props.declineFunction}></ColumnCreationForm>
        </div>
      </div>
    );
  }
  return (
    <div className="modal-page-overlay" onClick={decline}>
      <div className="modal-msg modal-msg-confirmation">
        <h3>{t('modal.sure', { reason: reasonKey })}</h3>
        <div className="modal-msg-confirmation-buttons">
          <button onClick={props.confirmFunction}>
            <i className="fa-solid fa-check"></i>
          </button>
          <button className="modal-msg-button-close" onClick={props.declineFunction}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

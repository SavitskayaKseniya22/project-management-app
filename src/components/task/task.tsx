import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useDeleteTaskMutation, useGetTaskQuery } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { TaskResponse } from '../../store/slices/types';
import { ModalWindow } from '../modal-window/modal-window';

interface TaskProps {
  columnId: string;
  taskItem: TaskResponse;
  taskId: string;
  index: number;
}

export const Task = (props: TaskProps) => {
  const [taskRemovalToConfirm, setTaskRemovalToConfirm] = useState<boolean>(false);
  const [taskEditToConfirm, setTaskEditToConfirm] = useState<boolean>(false);
  const boardId = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const { columnId, id, title, description } = props.taskItem;
  const toggleTaskRemoval = () => {
    setTaskRemovalToConfirm(!taskRemovalToConfirm);
    console.log('task that will be removed', props.taskItem.title, props.taskItem.id);
  };
  const toggleTaskEdit = () => {
    setTaskEditToConfirm(!taskEditToConfirm);
  };
  const [skip, setSkip] = useState(false);

  const [deleteTask] = useDeleteTaskMutation();

  const dispatch = useTypedDispatch();

  const confirmRemoval = async () => {
    setSkip(true);
    console.log('task being deleted', props.taskItem.title, props.taskItem.id);
    await deleteTask({ taskId: id, boardId, columnId });
    toggleTaskRemoval();
  };

  return (
    <li className="task-item">
      <div className="task-content">
        <h4>{title}</h4>
        <p className="task-description">{description}</p>
      </div>

      <div className="task-buttons">
        <button onClick={toggleTaskEdit} className="task-button task-edit">
          <i className="fa-solid fa-pen"></i>
        </button>

        <button onClick={toggleTaskRemoval} className="task-button task-delete">
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      {taskRemovalToConfirm && (
        <ModalWindow
          reason="delete the task"
          declineFunction={() => {
            toggleTaskRemoval();
          }}
          confirmFunction={confirmRemoval}
        ></ModalWindow>
      )}
      {taskEditToConfirm && (
        <ModalWindow
          reason="edit the task"
          declineFunction={() => {
            toggleTaskEdit();
          }}
          confirmFunction={() => {
            return;
          }}
          optional={{
            columnId: columnId,
          }}
          task={props.taskItem}
        ></ModalWindow>
      )}
    </li>
  );
};

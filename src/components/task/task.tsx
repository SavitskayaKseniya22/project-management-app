import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTypedDispatch, errorSlice } from '../../store';
import { useDeleteTaskMutation } from '../../store/services/task.service';
import { TaskResponse } from '../../store/slices/types';
import { ModalWindow } from '../modal-window/modal-window';

interface TaskProps {
  taskItem: TaskResponse;
  index: number;
  tasks?: { [id: string]: TaskResponse[] };
}

export const Task = (props: TaskProps) => {
  const [taskRemovalToConfirm, setTaskRemovalToConfirm] = useState<boolean>(false);
  const [taskEditToConfirm, setTaskEditToConfirm] = useState<boolean>(false);
  const location = useLocation();
  const boardId = location.pathname.slice(1);
  const dispatch = useTypedDispatch();

  const [taskListLocalStore, setTaskData] = useState(props.tasks);

  const { columnId, id, title, description } = props.taskItem;

  const toggleTaskRemoval = () => {
    setTaskRemovalToConfirm(!taskRemovalToConfirm);
  };
  const toggleTaskEdit = () => {
    setTaskEditToConfirm(!taskEditToConfirm);
  };

  const [deleteTask, { error: deleteTaskError }] = useDeleteTaskMutation();

  useEffect(() => {
    if (!deleteTaskError) return;
    if (deleteTaskError) dispatch(errorSlice.actions.updateError(deleteTaskError));
  }, [dispatch, deleteTaskError]);

  const confirmRemoval = async () => {
    const taskIndex = taskListLocalStore![columnId].findIndex((col) => col.id == id);
    const copySource = taskListLocalStore![columnId].slice();
    copySource.splice(taskIndex, 1);

    setTaskData({
      ...taskListLocalStore,
      ...{ [columnId]: copySource },
    });

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

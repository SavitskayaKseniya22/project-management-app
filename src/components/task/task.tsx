import { useEffect, useState } from 'react';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useDeleteTaskMutation, useGetTaskQuery } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { TaskResponse } from '../../store/slices/types';
import { ModalWindow } from '../modal-window/modal-window';

interface TaskProps {
  columnId: string;
  task: TaskResponse;
}

export const Task = (props: TaskProps) => {
  const [taskRemovalToConfirm, setTaskRemovalToConfirm] = useState<boolean>(false);
  const boardId = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const { columnId, task } = props;
  const toggleTaskRemoval = () => {
    setTaskRemovalToConfirm(!taskRemovalToConfirm);
  };
  const [skip, setSkip] = useState(false);

  const { data, error } = useGetTaskQuery(
    { taskId: task.id, columnId, boardId },
    {
      skip,
    }
  );
  const [deleteTask] = useDeleteTaskMutation();

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  const confirmRemoval = async () => {
    setSkip(true);
    await deleteTask({ taskId: task.id, boardId, columnId });
    toggleTaskRemoval();
  };

  return (
    <li className="task-item">
      <h4>{props.task.title}</h4>
      <p>{props.task.description}</p>
      <button onClick={toggleTaskRemoval}>Remove</button>
      <button>Edit</button>
      {taskRemovalToConfirm && (
        <ModalWindow
          reason="delete the column"
          declineFunction={() => {
            toggleTaskRemoval();
          }}
          confirmFunction={confirmRemoval}
        ></ModalWindow>
      )}
    </li>
  );
};

import { useEffect, useState } from 'react';
import { useTypedSelector, RootState, useTypedDispatch } from '../../store';
import { useDeleteColumnMutation, useGetColumnQuery } from '../../store/services/column.service';
import { useGetTaskListQuery } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { ColumnResponseAll, TaskResponse } from '../../store/slices/types';
import { EditTitle } from '../edit-title/editTitle';
import { ModalWindow } from '../modal-window/modal-window';
import { Task } from '../task/task';
import './column.scss';

export const Column = (props: { column: ColumnResponseAll }) => {
  const id = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const [skip, setSkip] = useState(false);

  const { data, error } = useGetColumnQuery(
    { id: id, columnId: props.column.id },
    {
      skip,
    }
  );

  const { data: taskList, error: taskListError } = useGetTaskListQuery(
    { boardId: id, columnId: props.column.id },
    {
      skip,
    }
  );

  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);
  const [taskFormOpen, setTaskFormOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [deleteColumn] = useDeleteColumnMutation();

  const toggleColumnForm = () => {
    setColumnFormOpen((columnFormOpen) => !columnFormOpen);
  };

  const toggleTaskForm = () => {
    setTaskFormOpen((taskFormOpen) => !taskFormOpen);
  };
  const confirmDeletion = async () => {
    setSkip(true);
    await deleteColumn({ id: id, columnId: props.column.id });
    toggleColumnForm();
  };

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (!error && !taskListError) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
    if (taskListError) dispatch(errorSlice.actions.updateError(taskListError));
  }, [dispatch, error, taskListError]);

  return (
    <li className="board-item">
      {editMode ? (
        <EditTitle id={id} column={props.column} setEditMode={setEditMode} />
      ) : (
        <h3
          onClick={() => {
            setEditMode(true);
          }}
        >
          {props.column.title}
        </h3>
      )}

      <button onClick={toggleColumnForm}>delete column</button>
      <button onClick={toggleTaskForm}>add task</button>

      <ul className="task-list">
        {data && taskList && taskList.length ? (
          <>
            {taskList.map((item: TaskResponse, idx) => {
              return <Task key={idx} columnId={data.id} taskId={item.id} />;
            })}
          </>
        ) : null}
      </ul>

      {columnFormOpen && (
        <ModalWindow
          reason="delete the column"
          declineFunction={() => {
            toggleColumnForm();
          }}
          confirmFunction={confirmDeletion}
        ></ModalWindow>
      )}
      {taskFormOpen && data && (
        <ModalWindow
          reason="create a task"
          declineFunction={toggleTaskForm}
          confirmFunction={() => {
            return;
          }}
          optional={{
            columnId: data.id,
            tasksAmount: `${data.tasks.length}`,
          }}
        ></ModalWindow>
      )}
    </li>
  );
};

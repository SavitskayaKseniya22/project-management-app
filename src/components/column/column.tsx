import { useEffect, useState } from 'react';
import { useTypedSelector, RootState, useTypedDispatch } from '../../store';
import { useDeleteColumnMutation, useGetColumnQuery } from '../../store/services/column.service';
import { errorSlice } from '../../store/slices';
import { ColumnResponseAll } from '../../store/slices/types';
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
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

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
        {data && data.tasks.length ? (
          <>
            {data.tasks.map((item: ColumnResponseAll, idx) => {
              return <Task key={idx} colId={data.id} task={data.tasks[idx]} />;
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
            colId: data.id,
          }}
        ></ModalWindow>
      )}
    </li>
  );
};

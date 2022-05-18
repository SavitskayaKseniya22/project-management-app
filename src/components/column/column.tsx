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
  const [editMode, setEditMode] = useState<boolean>(false);

  const [deleteColumn] = useDeleteColumnMutation();

  const toggleForm = () => {
    setColumnFormOpen((columnFormOpen) => !columnFormOpen);
  };

  const confirmDeletion = async () => {
    setSkip(true);
    await deleteColumn({ id: id, columnId: props.column.id });
    toggleForm();
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

      <button onClick={toggleForm}>delete column</button>
      <button>add task</button>

      <ul className="task-list">
        {data && data.tasks.length ? (
          <>
            {data.tasks.map((item: ColumnResponseAll, idx) => {
              return <Task key={idx} />;
            })}
          </>
        ) : null}
      </ul>

      {columnFormOpen && (
        <ModalWindow
          reason="delete the column"
          declineFunction={() => {
            toggleForm();
          }}
          confirmFunction={confirmDeletion}
        ></ModalWindow>
      )}
    </li>
  );
};

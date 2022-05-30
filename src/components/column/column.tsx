import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import { useTypedDispatch } from '../../store';
import { useDeleteColumnMutation } from '../../store/services/column.service';
import { useGetTaskListQuery } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { ColumnResponseAll, TaskResponse } from '../../store/slices/types';
import { EditTitle } from '../edit-title/editTitle';
import { ModalWindow } from '../modal-window/modal-window';
import { Task } from '../task/task';
import './column.scss';

export const Column = (props: {
  column: ColumnResponseAll;
  tasks:
    | {
        [id: string]: TaskResponse[];
      }
    | undefined;
}) => {
  const location = useLocation();
  const id = location.pathname.slice(1);

  const { data, error: getTaskListError } = useGetTaskListQuery({
    boardId: id,
    columnId: props.column.id,
  });

  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);
  const [taskFormOpen, setTaskFormOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [deleteColumn, { error: deleteColumnError }] = useDeleteColumnMutation();

  const toggleColumnForm = () => {
    setColumnFormOpen((columnFormOpen) => !columnFormOpen);
  };

  const toggleTaskForm = () => {
    setTaskFormOpen((taskFormOpen) => !taskFormOpen);
  };

  const confirmDeletion = async () => {
    await deleteColumn({ id: id, columnId: props.column.id });
    toggleColumnForm();
  };

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (!getTaskListError && !deleteColumnError) return;
    if (getTaskListError) dispatch(errorSlice.actions.updateError(getTaskListError));
    if (deleteColumnError) dispatch(errorSlice.actions.updateError(deleteColumnError));
  }, [deleteColumnError, dispatch, getTaskListError]);

  return (
    <li className="board-item">
      <div className="column-buttons">
        <button onClick={toggleColumnForm} className="column-delete column-button">
          <i className="fa-solid fa-trash-can"></i>
        </button>

        <button onClick={toggleTaskForm} className="task-add column-button">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
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

      <Droppable droppableId={props.column.id} direction="vertical" type="task">
        {(provided) => (
          <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
            {data && props.tasks && props.tasks[props.column.id] ? (
              <>
                {props.tasks[props.column.id].map((item: TaskResponse, idx) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={idx}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task index={idx} taskItem={item} tasks={props.tasks} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </>
            ) : null}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

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
            columnId: props.column.id,
          }}
        ></ModalWindow>
      )}
    </li>
  );
};

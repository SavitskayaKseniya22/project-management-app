import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import { useTypedDispatch } from '../../store';
import { useDeleteColumnMutation, useGetColumnQuery } from '../../store/services/column.service';
import { useGetTaskListQuery, useUpdateTaskMutation } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { Board, ColumnResponseAll, TaskResponse } from '../../store/slices/types';

import { EditTitle } from '../edit-title/editTitle';
import { ModalWindow } from '../modal-window/modal-window';
import { Task } from '../task/task';
import './column.scss';

export const Column = (props: { column: ColumnResponseAll; board: Board }) => {
  const location = useLocation();
  const id = location.pathname.slice(1);

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
  console.log('task list that column sees', taskList);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);
  const [taskFormOpen, setTaskFormOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [deleteColumn] = useDeleteColumnMutation();
  const [updateTask] = useUpdateTaskMutation();

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
        {(provided, snapshot) => (
          <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
            {data && taskList && taskList.length ? (
              <>
                {taskList
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((item: TaskResponse, idx) => {
                    return (
                      <Draggable key={item.id} draggableId={item.id} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task columnId={data.id} taskId={item.id} index={idx} taskItem={item} />
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
            columnId: data.id,
          }}
        ></ModalWindow>
      )}
    </li>
  );
};

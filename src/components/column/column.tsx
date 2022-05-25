import { useEffect, useState } from 'react';
import { Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTypedSelector, RootState, useTypedDispatch } from '../../store';
import { useDeleteColumnMutation, useGetColumnQuery } from '../../store/services/column.service';
import { useGetTaskListQuery, useUpdateTaskMutation } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { ColumnResponseAll, TaskResponse } from '../../store/slices/types';
import { getMaxOrderFromData } from '../../utits/getMaxOrderFromData';
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

  /*DnD functions*/
  const changeOrder = async (list: TaskResponse[]) => {
    const maxValue = getMaxOrderFromData(list);
    const newList = list.map((item: TaskResponse, idx) => {
      return {
        task: {
          ...item,
          order: idx + 1 + maxValue,
        },
        taskId: item.id,
        boardId: id,
        columnId: props.column.id,
      };
    });
    Promise.allSettled(
      newList.map((item) => {
        return updateTask(item);
      })
    );
  };

  const reorder = (list: TaskResponse[], startIndex: number, endIndex: number) => {
    const result = list.slice();
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      taskList as TaskResponse[],
      result.source.index,
      result.destination.index
    );
    /*changeOrder(items);*/
  };

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
      <Droppable droppableId={props.column.id} direction="vertical" type="task">
        {(provided, snapshot) => (
          <ul className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
            {data && taskList && taskList.length ? (
              <div>
                {taskList.map((item: TaskResponse, idx) => {
                  return <Task key={idx} columnId={data.id} taskId={item.id} index={idx} />;
                })}
              </div>
            ) : null}
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

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Column } from '../../components/column/column';
import { ModalWindow } from '../../components/modal-window/modal-window';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import {
  useGetColumnListQuery,
  useUpdateColumnMutation,
} from '../../store/services/column.service';
import { errorSlice } from '../../store/slices/error.slice';
import { ColumnResponseAll, TaskResponse } from '../../store/slices/types';
import './board-page.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../store/services/task.service';

import { TaskRequest } from '../../store/slices/types';

export function BoardPage() {
  const location = useLocation();
  const id = location.pathname.slice(1);

  const { error: GetColumnListError } = useGetColumnListQuery(id);

  const columnListGlobalStore = useTypedSelector((state: RootState) => state.columnListSlice[id]);
  const [columnListLocalStore, setData] = useState<ColumnResponseAll[] | undefined | null>(
    columnListGlobalStore
  );

  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);

  const toggleColumnForm = () => {
    setColumnFormOpen((columnFormOpen) => !columnFormOpen);
  };

  const dispatch = useTypedDispatch();
  const [updateColumn, { error: updateColumnError }] = useUpdateColumnMutation();
  const [updateTask, { error: updateTaskError }] = useUpdateTaskMutation();
  const [deleteTask, { error: deleteTaskError }] = useDeleteTaskMutation();
  const [createTask, { error: createTaskError }] = useCreateTaskMutation();

  useEffect(() => {
    if (
      !GetColumnListError &&
      !updateColumnError &&
      !updateTaskError &&
      !deleteTaskError &&
      !createTaskError
    )
      return;
    if (GetColumnListError) dispatch(errorSlice.actions.updateError(GetColumnListError));
    if (updateColumnError) dispatch(errorSlice.actions.updateError(updateColumnError));
    if (updateTaskError) dispatch(errorSlice.actions.updateError(updateTaskError));
    if (deleteTaskError) dispatch(errorSlice.actions.updateError(deleteTaskError));
    if (createTaskError) dispatch(errorSlice.actions.updateError(createTaskError));
  }, [
    dispatch,
    GetColumnListError,
    updateColumnError,
    updateTaskError,
    deleteTaskError,
    createTaskError,
  ]);

  useEffect(() => {
    setData(columnListGlobalStore);
  }, [columnListGlobalStore]);

  const taskListGlobalStore = useTypedSelector((state: RootState) => state.taskListSlice[id]);
  const [taskListLocalStore, setTaskData] = useState<{
    [id: string]: TaskResponse[];
  }>(taskListGlobalStore);

  useEffect(() => {
    setTaskData({ ...taskListLocalStore, ...taskListGlobalStore });
  }, [taskListGlobalStore]);

  const reorder = (
    list: ColumnResponseAll[] | TaskResponse[],
    startIndex: number,
    endIndex: number
  ) => {
    const result = list.slice();
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const updateTaskOrder = async (item: TaskResponse, idx: number) => {
    return updateTask({
      task: {
        title: item.title,
        order: idx + 1,
        description: item.description,
        userId: item.userId,
        boardId: id,
        columnId: item.columnId,
      },
      taskId: item.id,
      boardId: id,
      columnId: item.columnId,
    });
  };

  const updateColumnOrder = async (item: ColumnResponseAll, idx: number) => {
    return updateColumn({
      column: {
        title: item.title,
        order: idx + 1,
      },
      id: id as string,
      columnId: item.id,
    });
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const items = reorder(
        columnListGlobalStore as ColumnResponseAll[],
        result.source.index,
        destination.index
      );
      setData(items);

      await updateColumnOrder(items[destination.index], destination.index);
      return;
    }

    /*Dragging inside the column*/

    if (source.droppableId === destination.droppableId) {
      const col = reorder(
        taskListLocalStore![source.droppableId] as TaskResponse[],
        result.source.index,
        destination.index
      ) as TaskResponse[];

      const columnId = col[0].columnId;
      setTaskData({ ...taskListLocalStore, ...{ [columnId]: col } });
      await updateTaskOrder((col as TaskResponse[])[destination.index], destination.index);
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const task = taskListLocalStore![source.droppableId].find(
        (col) => col.id == result.draggableId
      );

      const copySource = taskListLocalStore![source.droppableId].slice();
      const [removed] = copySource.splice(result.source.index, 1);
      const copyDest = taskListLocalStore![destination.droppableId].slice();
      copyDest.splice(destination.index, 0, removed);

      setTaskData({
        ...taskListLocalStore,
        ...{ [source.droppableId]: copySource },
        ...{ [destination.droppableId]: copyDest },
      });

      createTask({
        task: {
          title: task?.title as string,
          description: task?.description as string,
          userId: task?.userId as string,
        },
        boardId: id,
        columnId: destination.droppableId,
      });

      deleteTask({
        taskId: result.draggableId,
        columnId: result.source.droppableId,
        boardId: id,
      });
      /*
      if (task) {
        const updatedTask: TaskRequest = {
          title: task.title,
          order: destination.index + 1,
          description: task.description,
          userId: task.userId,
          boardId: task.boardId,
          columnId: destination.droppableId,
        };

        updateTask({
          task: updatedTask,
          taskId: task.id,
          columnId: task.columnId,
          boardId: id,
        });
      }*/
    }

    return;
  };

  return (
    <div className="board-page">
      <div className="board-page-buttons">
        <Link to="/main" className="board-back">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <button onClick={toggleColumnForm} className="board-new-column">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal" type="column">
          {(provided) => (
            <ul className="board-list" ref={provided.innerRef} {...provided.droppableProps}>
              <>
                {columnListLocalStore
                  ? columnListLocalStore.map((item: ColumnResponseAll, idx) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Column key={idx} column={item} tasks={taskListLocalStore} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  : null}
              </>

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {columnFormOpen && (
        <ModalWindow
          reason="create a column"
          declineFunction={toggleColumnForm}
          confirmFunction={() => {
            return;
          }}
        ></ModalWindow>
      )}
    </div>
  );
}

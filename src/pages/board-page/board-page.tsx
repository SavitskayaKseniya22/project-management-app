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

export function BoardPage() {
  const location = useLocation();
  const id = location.pathname.slice(1);

  const dataStore = useTypedSelector((state: RootState) => state.columnListSlice[id]);
  const [data, setData] = useState<ColumnResponseAll[] | undefined | null>(dataStore);
  const { error } = useGetColumnListQuery(id);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);

  const toggleColumnForm = () => {
    setColumnFormOpen((columnFormOpen) => !columnFormOpen);
  };

  const dispatch = useTypedDispatch();
  const [updateColumn] = useUpdateColumnMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [createTask] = useCreateTaskMutation();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  useEffect(() => {
    setData(dataStore);
  }, [dataStore]);

  const [taskData, setTaskData] = useState<{
    [id: string]: TaskResponse[];
  }>();

  const taskStore = useTypedSelector((state: RootState) => state.taskListSlice[id]);

  useEffect(() => {
    setTaskData({ ...taskData, ...taskStore });
  }, [taskStore]);

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
        dataStore as ColumnResponseAll[],
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
        taskData![source.droppableId] as TaskResponse[],
        result.source.index,
        destination.index
      ) as TaskResponse[];

      const columnId = col[0].columnId;
      setTaskData({ ...taskData, ...{ [columnId]: col } });
      await updateTaskOrder((col as TaskResponse[])[destination.index], destination.index);
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const task = taskData![source.droppableId].find((col) => col.id == result.draggableId);

      await createTask({
        task: {
          title: task?.title as string,
          description: task?.description as string,
          userId: task?.userId as string,
        },
        boardId: id,
        columnId: destination.droppableId,
      });

      await deleteTask({
        taskId: result.draggableId,
        columnId: result.source.droppableId,
        boardId: id,
      });
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
                {data
                  ? data.map((item: ColumnResponseAll, idx) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Column key={idx} column={item} tasks={taskData} />
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

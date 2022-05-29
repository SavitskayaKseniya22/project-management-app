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
import { Board, ColumnResponseAll, TaskResponse, Column as ColInt } from '../../store/slices/types';
import './board-page.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import taskApi, {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskListQuery,
  useUpdateTaskMutation,
} from '../../store/services/task.service';
import { useGetBoardQuery } from '../../store/services/boardList.service';
import { boardSlice } from '../../store/slices/board.slice';

export function BoardPage() {
  const location = useLocation();
  const id = location.pathname.slice(1);

  const dataStore = useTypedSelector((state: RootState) => state.columnListSlice[id]);
  const [data, setData] = useState<ColumnResponseAll[] | undefined | null>(dataStore);
  const { data: boardStore, error: boardError } = useGetBoardQuery(id);
  const { error } = useGetColumnListQuery(id);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);

  /*const [boardState, setBoardState] = useState<Board | undefined | null>(boardStore);*/

  const board = useTypedSelector((state: RootState) => state.boardSlice.board) as Board;
  console.log('board-data', board);
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

  /*useEffect(() => {
    setBoardState(boardStore);
  }, [boardStore]);*/

  /*unused older order changing functions (that caused the bug)*/
  /*
  const changeOrder = async (list: ColumnResponseAll[]) => {
    const newList = list.map((item: ColumnResponseAll, idx) => {
      return {
        column: {
          title: item.title,
          order: idx + 1,
        },
        id: id as string,
        columnId: item.id,
      };
    });
    Promise.allSettled(
      newList.map((item) => {
        return updateColumn(item);
      })
    );
  };

  const changeTaskOrder = async (list: TaskResponse[], colId: string) => {
    const newList = list.map((item: TaskResponse, idx) => {
      return {
        task: {
          title: item.title,
          order: idx + 1,
          description: item.description,
          userId: item.userId,
          boardId: (board as Board).id,
          columnId: colId,
        },
        taskId: item.id,
        boardId: id,
        columnId: colId,
      };
    });
    Promise.allSettled(
      newList.map((item) => {
        return updateTask(item);
      })
    );
  };
*/
  const reorder = (
    list: ColumnResponseAll[] | TaskResponse[],
    startIndex: number,
    endIndex: number
  ) => {
    console.log('startIndex', startIndex);
    console.log('endIndex', endIndex);
    const result = list.slice();
    const [removed] = result.splice(startIndex, 1);
    console.log('removed', removed);
    result.splice(endIndex, 0, removed);
    console.log('reordering result', result);
    /*return result;*/
    return result;
  };

  const updateTaskOrder = async (item: TaskResponse, idx: number) => {
    console.log('updating task');
    return updateTask({
      task: {
        title: item.title,
        order: idx + 1,
        description: item.description,
        userId: item.userId,
        boardId: (board as Board).id,
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
    const { destination, source, draggableId, type } = result;

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
      /*await changeOrder(items);*/
      await updateColumnOrder(items[destination.index], destination.index);
      return;
    }

    /*Dragging inside the column*/

    if (source.droppableId === destination.droppableId) {
      const home = (board as Board).columns.find(
        (col: ColInt) => col.id == source.droppableId
      ) as ColInt;
      const col = reorder(
        home.tasks as TaskResponse[],
        result.source.index,
        destination.index
      ) as TaskResponse[];

      dispatch(
        boardSlice.actions.updateColumnTasks({ taskList: col as TaskResponse[], colId: home.id })
      );

      await updateTaskOrder((col as TaskResponse[])[destination.index], destination.index);
      return;
    }

    /*Dragging outside the column*/
    console.log('ATTENTION THE ITEM IS DRAGGED OUTSIDE');

    const home = (board as Board).columns.find(
      (col: ColInt) => col.id == source.droppableId
    ) as ColInt;
    const foreign = (board as Board).columns.find(
      (col: ColInt) => col.id == destination.droppableId
    ) as ColInt;
    const newHome = (home.tasks as TaskResponse[]).slice();
    const newForeign = (foreign.tasks as TaskResponse[]).slice();
    const [removed] = newHome.splice(source.index, 1);
    console.log('removed item is ', removed.title);
    newForeign.splice(destination.index, 0, removed);
    /*dispatch(
      boardSlice.actions.updateColumnTasks({
        taskList: newForeign as TaskResponse[],
        colId: foreign.id,
      })
    );
    dispatch(
      boardSlice.actions.updateColumnTasks({ taskList: newHome as TaskResponse[], colId: home.id })
    );*/

    await deleteTask({ taskId: removed.id, columnId: removed.columnId, boardId: removed.boardId });

    await createTask({
      task: {
        title: removed.title,
        description: removed.description,
        userId: removed.userId,
      },
      boardId: id,
      columnId: destination.droppableId,
    });

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
          {(provided, snapshot) => (
            <ul className="board-list" ref={provided.innerRef} {...provided.droppableProps}>
              <>
                {data
                  ? data.map((item: ColumnResponseAll, idx) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Column key={idx} column={item} board={board as Board} />
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

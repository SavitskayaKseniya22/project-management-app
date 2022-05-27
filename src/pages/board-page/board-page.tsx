import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
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
import { skipToken } from '@reduxjs/toolkit/dist/query';
import taskApi, {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskListQuery,
  useUpdateTaskMutation,
} from '../../store/services/task.service';
import { useGetBoardQuery } from '../../store/services/boardList.service';
import { boardSlice } from '../../store/slices/board.slice';
import { isConstructorDeclaration } from 'typescript';

export function BoardPage() {
  const id = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const dataStore = useTypedSelector((state: RootState) => state.columnListSlice[id]);
  const [data, setData] = useState<ColumnResponseAll[] | undefined | null>(dataStore);
  const { error } = useGetColumnListQuery(id);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);

  /* const [homeCol, setHomeCol] = useState<{ columnId: string; boardId: string } | typeof skipToken>(
    skipToken
  );
  const [foreignCol, setForeignCol] = useState<
    { columnId: string; boardId: string } | typeof skipToken
  >(skipToken);
  */

  /*const { data: home, error: homeColErr } = useGetTaskListQuery(homeCol);
  const { data: foreign, error: foreignColErr } = useGetTaskListQuery(foreignCol);
  */
  const { data: boardStore, error: boardError } = useGetBoardQuery(id);
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
    if (!error) return; //&& !homeColErr && foreignColErr
    if (error) dispatch(errorSlice.actions.updateError(error));
    //if (homeColErr) dispatch(errorSlice.actions.updateError(homeColErr));
    //if (foreignColErr) dispatch(errorSlice.actions.updateError(foreignColErr));
  }, [dispatch, error]);

  useEffect(() => {
    setData(dataStore);
  }, [dataStore]);
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

  /*const changeTaskOrder = async (list: TaskResponse[], colId: string) => {
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
  };*/

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

  /*
  const onDragEnd2 = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      dataStore as ColumnResponseAll[],
      result.source.index,
      result.destination.index
    );
    setData(items);
    changeOrder(items);
  };
*/

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
      const col = reorder(home.tasks as TaskResponse[], result.source.index, destination.index);
      dispatch(
        boardSlice.actions.updateColumnTasks({ taskList: col as TaskResponse[], colId: home.id })
      );
      await updateTaskOrder((col as TaskResponse[])[destination.index], destination.index);
      return;
    }
    /*Dragging outside the column*/
    console.log('ATTENTION IT IS DRAGGED OUTSIDE');
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
    /*await updateTaskOrder((newForeign as TaskResponse[])[destination.index], destination.index);*/
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
    /* await changeTaskOrder(newHome as TaskResponse[], source.droppableId);
    await changeTaskOrder(newForeign as TaskResponse[], source.droppableId);*/
    // moving from one list to another

    //const home = this.state.columns[source.droppableId];
    //const foreign = this.state.columns[destination.droppableId];
    /*Dragging tasks within the columns*/
    /*if (source.droppableId === destination.droppableId) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
        },
      };

      this.setState(newState);
      return;
    }

    // MOVING FROM ONE LIST TO ANOTHER

    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    this.setState(newState);
    */
  };

  return (
    <>
      <header>
        <button onClick={toggleColumnForm}>
          <FormattedMessage id="header_newColumn" defaultMessage="Create new column" />
        </button>

        <Link to="/main">
          <button>
            <FormattedMessage id="boardpage_back" defaultMessage="Back to boards list" />
          </button>
        </Link>
      </header>

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
    </>
  );
}

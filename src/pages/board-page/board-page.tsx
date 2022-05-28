import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Column } from '../../components/column/column';
import { ModalWindow } from '../../components/modal-window/modal-window';
import { useTypedDispatch } from '../../store';
import {
  useGetColumnListQuery,
  useUpdateColumnMutation,
} from '../../store/services/column.service';
import { errorSlice } from '../../store/slices/error.slice';
import { ColumnResponseAll, TaskResponse, Column as ColInt } from '../../store/slices/types';
import './board-page.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../../store/services/task.service';
import { useGetBoardQuery } from '../../store/services/boardList.service';
import { boardSlice } from '../../store/slices/board.slice';

function BoardPane({ boardId }: { boardId: string }) {
  const { error } = useGetColumnListQuery(boardId);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);
  const { data: board } = useGetBoardQuery(boardId);

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

  const reorder = <T extends ColumnResponseAll | TaskResponse>(
    list: T[],
    startIndex: number,
    endIndex: number
  ): T[] => {
    const result = list.slice();
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const updateTaskOrder = async (item: TaskResponse, idx: number) => {
    if (!board) {
      return;
    }

    return updateTask({
      task: {
        title: item.title,
        order: idx + 1,
        description: item.description,
        userId: item.userId,
        boardId: board.id,
        columnId: item.columnId,
      },
      taskId: item.id,
      boardId: boardId,
      columnId: item.columnId,
    });
  };

  const updateColumnOrder = async (item: ColumnResponseAll, idx: number) => {
    return updateColumn({
      column: {
        title: item.title,
        order: idx + 1,
      },
      id: boardId,
      columnId: item.id,
    });
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination || !board) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      // const items = reorder(board?.columns, result.source.index, destination.index);
      // setData(items);
      /*await changeOrder(items);*/
      //await updateColumnOrder(items[destination.index], destination.index);
      return;
    }

    /*Dragging inside the column*/

    if (source.droppableId === destination.droppableId) {
      const home = board.columns.find((col: ColInt) => col.id == source.droppableId);

      if (!home) {
        return;
      }

      const col = reorder<TaskResponse>(home.tasks, result.source.index, destination.index);

      dispatch(boardSlice.actions.updateColumnTasks({ taskList: col, colId: home.id }));

      await updateTaskOrder((col as TaskResponse[])[destination.index], destination.index);

      return;
    }

    const home = board.columns.find((col: ColInt) => col.id == source.droppableId);
    const foreign = board.columns.find((col: ColInt) => col.id == destination.droppableId);

    if (!home || !foreign) {
      return;
    }

    const newHome = home.tasks.slice();
    const newForeign = foreign.tasks.slice();
    const [removed] = newHome.splice(source.index, 1);

    newForeign.splice(destination.index, 0, removed);
    await deleteTask({ taskId: removed.id, columnId: removed.columnId, boardId: removed.boardId });

    await createTask({
      task: {
        title: removed.title,
        description: removed.description,
        userId: removed.userId,
      },
      boardId: boardId,
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
                {board
                  ? board.columns.map((item, idx) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Column key={idx} column={item} board={board} />
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

export function BoardPage() {
  const { boardId } = useParams();

  if (!boardId) {
    return <div>No board selected</div>;
  }

  return <BoardPane boardId={boardId} />;
}

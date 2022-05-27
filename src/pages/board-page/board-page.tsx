import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/column';
import { ModalWindow } from '../../components/modal-window/modal-window';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import {
  useGetColumnListQuery,
  useUpdateColumnMutation,
} from '../../store/services/column.service';
import { errorSlice } from '../../store/slices/error.slice';
import { ColumnResponseAll } from '../../store/slices/types';
import './board-page.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

export function BoardPage() {
  const id = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const dataStore = useTypedSelector((state: RootState) => state.columnListSlice[id]);
  const [data, setData] = useState<ColumnResponseAll[] | undefined | null>(dataStore);
  const { data: whatevs, error } = useGetColumnListQuery(id);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    setData(dataStore);
  }, [dataStore]);

  const toggleColumnForm = () => {
    setColumnFormOpen((columnFormOpen) => !columnFormOpen);
  };

  const dispatch = useTypedDispatch();
  const [updateColumn] = useUpdateColumnMutation();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

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

  const reorder = (list: ColumnResponseAll[], startIndex: number, endIndex: number) => {
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
      dataStore as ColumnResponseAll[],
      result.source.index,
      result.destination.index
    );
    setData(items);
    changeOrder(items);
  };

  /*const onDragEnd2 = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const items = reorder(
        dataStore as ColumnResponseAll[],
        source.index,
        destination.index
      );
      setData(items);
      changeOrder(items);
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];
    /*Dragging tasks within the columns*/
  /*if(source.droppableId === destination.droppableId) {
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

    // moving from one list to another

    /*const homeTaskIds = Array.from(home.taskIds);
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
  };

  */

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
                              <Column key={idx} column={item} />
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

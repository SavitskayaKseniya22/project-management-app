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
import { ColumnResponseAll } from '../../store/slices/types';
import './board-page.scss';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { getMaxOrderFromData } from '../../utits/getMaxOrderFromData';

export function BoardPage() {
  const id = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const dataStore = useTypedSelector((state: RootState) => state.columnListSlice[id]);
  const [data, setData] = useState<ColumnResponseAll[] | undefined | null>(dataStore);
  const { error } = useGetColumnListQuery(id);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);

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
    const maxValue = getMaxOrderFromData(list);
    const newList = list.map((item: ColumnResponseAll, idx) => {
      return {
        column: {
          title: item.title,
          order: idx + 1 + maxValue,
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
        <Droppable droppableId="droppable" direction="horizontal">
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
    </>
  );
}

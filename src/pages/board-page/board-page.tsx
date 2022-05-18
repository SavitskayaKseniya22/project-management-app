import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Column } from '../../components/column/column';
import { ModalWindow } from '../../components/modal-window/modal-window';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useGetColumnListQuery } from '../../store/services/column.service';
import { errorSlice } from '../../store/slices/error.slice';
import { ColumnResponseAll } from '../../store/slices/types';
import './board-page.scss';

export function BoardPage() {
  const id = useTypedSelector((state: RootState) => state.boardSlice.board?.id);
  const { data, error } = useGetColumnListQuery(id);
  const [columnFormOpen, setColumnFormOpen] = useState<boolean>(false);

  const toggleForm = () => {
    setColumnFormOpen((columnFormOpen) => !columnFormOpen);
  };

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  return (
    <>
      <header>
        <button>
          <FormattedMessage id="header_newColumn" defaultMessage="Create new column" />
        </button>

        <Link to="/main">
          <button>
            <FormattedMessage id="boardpage_back" defaultMessage="Back to boards list" />
          </button>
        </Link>
      </header>

      <ul className="board-list">
        <li className="board-item-small" onClick={toggleForm}>
          Create a column
        </li>
        {data && data.length ? (
          <>
            {data.map((item: ColumnResponseAll, idx) => {
              return <Column key={idx} column={item} />;
            })}
          </>
        ) : null}
      </ul>

      {columnFormOpen && (
        <ModalWindow
          reason="create a column"
          declineFunction={toggleForm}
          confirmFunction={() => {
            return;
          }}
        ></ModalWindow>
      )}
    </>
  );
}

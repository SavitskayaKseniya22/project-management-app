import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BoardItemSmall } from '../../components/board-item-small/board-item-small';
import { ModalWindow } from '../../components/modal-window/modal-window';
import { useTypedDispatch } from '../../store';
import { useBoardListQuery, useDeleteBoardMutation } from '../../store/services/boardList.service';
import { errorSlice } from '../../store/slices';
import { Board } from '../../store/slices/types';
import './main-page.scss';

export function MainPage() {
  const { data, error: getBoardListError } = useBoardListQuery(undefined);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [boardFormOpen, setBoardFormOpen] = useState<boolean>(false);

  const [triggerDelete, { error: deleteBoardError }] = useDeleteBoardMutation();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!getBoardListError && !deleteBoardError) return;
    if (getBoardListError) dispatch(errorSlice.actions.updateError(getBoardListError));
    if (deleteBoardError) dispatch(errorSlice.actions.updateError(deleteBoardError));
  }, [deleteBoardError, dispatch, getBoardListError]);

  const openBoardForm = () => {
    setBoardFormOpen(true);
  };

  const closeBoardForm = () => {
    setBoardFormOpen(false);
  };

  const closeDeleteModal = () => {
    setBoardToDelete(null);
  };

  const deleteBoard = async () => {
    await triggerDelete(boardToDelete as string);
    setBoardToDelete(null);
  };

  return (
    <div className="main-page">
      {data && !data.length ? <h2>{t('mainpage.suggestion')}</h2> : null}
      <ul className="board-list">
        <li className="board-item-small board-item-create" onClick={openBoardForm}>
          <h3>{t('header.newBoard')}</h3>
        </li>
        {data &&
          data.map((item: Board, idx) => {
            return (
              <BoardItemSmall
                board={item}
                openDeleteModal={() => setBoardToDelete(item.id)}
                key={idx}
              ></BoardItemSmall>
            );
          })}

        {boardToDelete && (
          <ModalWindow
            reason="delete this board"
            declineFunction={closeDeleteModal}
            confirmFunction={deleteBoard}
          ></ModalWindow>
        )}
        {boardFormOpen && (
          <ModalWindow
            reason="create a board"
            declineFunction={closeBoardForm}
            confirmFunction={() => {
              return;
            }}
          ></ModalWindow>
        )}
      </ul>
    </div>
  );
}

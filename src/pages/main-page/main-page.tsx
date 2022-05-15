import { $CombinedState } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { BoardItemSmall } from '../../components/board-item-small/board-item-small';
import { ModalWindow } from '../../components/modal-window/modal-window';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useBoardListQuery, useDeleteBoardMutation } from '../../store/services/boardList.service';
import { errorSlice } from '../../store/slices';
import { Board } from '../../store/slices/types';
import './main-page.scss';

export function MainPage() {
  const { data, error } = useBoardListQuery(undefined);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [boardFormOpen, setBoardFormOpen] = useState<boolean>(false);

  const [triggerDelete] = useDeleteBoardMutation();
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

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

  if (data && data.length > 0) {
    return (
      <div className="main-page">
        <div className="board-list">
          {data.map((item: Board, idx) => {
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
          <div className="board-item-small" onClick={openBoardForm}>
            {' '}
            Create a board
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="main-page">
      <h1>There are no boards yet. Would you like to create one?</h1>
      <div className="board-list">
        {boardFormOpen && (
          <ModalWindow
            reason="create a board"
            declineFunction={closeBoardForm}
            confirmFunction={() => {
              return;
            }}
          ></ModalWindow>
        )}
        <div className="board-item-small" onClick={openBoardForm}>
          {' '}
          Create a board
        </div>
      </div>
    </div>
  );
}

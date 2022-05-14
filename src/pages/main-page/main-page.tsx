import { $CombinedState } from '@reduxjs/toolkit';
import { useState } from 'react';
import { BoardItemSmall } from '../../components/board-item-small/board-item-small';
import { ModalWindow } from '../../components/modal-window/modal-window';
import { RootState, useTypedSelector } from '../../store';
import { useBoardListQuery, useDeleteBoardMutation } from '../../store/services/boardList.service';
import { Board } from '../../store/slices/types';
import './main-page.scss';

export function MainPage() {
  const { data } = useBoardListQuery(undefined); // useTypedSelector((state: RootState) => state.boardListSlice.boardList)
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);
  const [boardFormOpen, setBoardFormOpen] = useState<boolean>(false);

  const [triggerDelete] = useDeleteBoardMutation();
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
    );
  }
  return (
    <div>
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

import { $CombinedState } from '@reduxjs/toolkit';
import { BoardItemSmall } from '../../components/board-item-small/board-item-small';
import { RootState, useTypedSelector } from '../../store';
import { useBoardListQuery } from '../../store/services/boardList.service';
import { Board } from '../../store/slices/types';
import './main-page.scss';

export function MainPage() {
  const { data } = useBoardListQuery(undefined); // useTypedSelector((state: RootState) => state.boardListSlice.boardList)
  if (data) {
    return (
      <div className="board-list">
        {data.map((item: Board, idx) => {
          return <BoardItemSmall board={item} key={idx}></BoardItemSmall>;
        })}
        <div className="board-item-small"> Create a board</div>
      </div>
    );
  }
  return (
    <div>
      <h1>There are no boards yet. Would you like to create one?</h1>
      <div className="board-list"></div>
    </div>
  );
}

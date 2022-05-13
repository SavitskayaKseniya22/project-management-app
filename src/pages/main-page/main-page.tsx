import { $CombinedState } from '@reduxjs/toolkit';
import { RootState, useTypedSelector } from '../../store';
import { useBoardListQuery } from '../../store/services/boardList.service';

export function MainPage() {
  const boardList = useBoardListQuery(undefined); // useTypedSelector((state: RootState) => state.boardListSlice.boardList)
  if (boardList) {
    return <div>I display boards</div>;
  }
  return <h1>There are no boards yet. Would you like to create one?</h1>;
}

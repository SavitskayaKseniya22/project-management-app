import { Link } from 'react-router-dom';
import { useTypedDispatch } from '../../store';
import { boardSlice } from '../../store/slices/board.slice';
import { Board } from '../../store/slices/types';

interface BoardItemProps {
  board: Board;
  openDeleteModal: () => void;
}

export function BoardItemSmall(props: BoardItemProps) {
  const dispatch = useTypedDispatch();
  const getActiveBoard = () => {
    dispatch(boardSlice.actions.updateActiveBoard(props.board));
  };

  return (
    <div className="board-item-small">
      <h2>{props.board.title}</h2>
      <p>{props.board.description}</p>
      <div className="buttons">
        <Link to="/board">
          <button className="button-orange" onClick={getActiveBoard}>
            Open
          </button>
        </Link>
        <button className="button-orange" onClick={props.openDeleteModal}>
          Delete
        </button>
      </div>
    </div>
  );
}

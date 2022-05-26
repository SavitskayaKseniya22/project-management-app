import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../store';
import { boardSlice } from '../../store/slices/board.slice';
import { Board } from '../../store/slices/types';

interface BoardItemProps {
  board: Board;
  openDeleteModal: () => void;
}

export function BoardItemSmall(props: BoardItemProps) {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const getActiveBoard = () => {
    dispatch(boardSlice.actions.updateActiveBoard(props.board));
    navigate('/board', { replace: true });
  };

  return (
    <div className="board-item-small">
      <h3> {props.board.title} </h3>
      <p>{props.board.description}</p>
      <button onClick={props.openDeleteModal} className="board-delete">
        <i className="fa-solid fa-trash-can"></i>
      </button>
      <button onClick={getActiveBoard} className="board-open">
        <i className="fa-solid fa-up-right-from-square"></i>
      </button>
    </div>
  );
}

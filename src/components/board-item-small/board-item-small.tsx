import { Link } from 'react-router-dom';
import { Board } from '../../store/slices/types';

interface BoardItemProps {
  board: Board;
  openDeleteModal: () => void;
}

export function BoardItemSmall(props: BoardItemProps) {
  return (
    <div className="board-item-small">
      <h3> {props.board.title} </h3>
      <p>{props.board.description}</p>
      <button onClick={props.openDeleteModal} className="board-delete">
        <i className="fa-solid fa-trash-can"></i>
      </button>
      <Link to={`/${props.board.id}`} className="board-open">
        <i className="fa-solid fa-up-right-from-square"></i>
      </Link>
    </div>
  );
}

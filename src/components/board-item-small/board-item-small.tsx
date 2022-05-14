import { Board } from '../../store/slices/types';

interface BoardItemProps {
  board: Board;
  openDeleteModal: () => void;
}
export function BoardItemSmall(props: BoardItemProps) {
  return (
    <div className="board-item-small">
      <h2>{props.board.title}</h2>
      <p>{props.board.description}</p>
      <div className="buttons">
        <button className="button-orange">Open</button>
        <button className="button-orange" onClick={props.openDeleteModal}>
          Delete
        </button>
      </div>
    </div>
  );
}

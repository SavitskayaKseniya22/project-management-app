import { Task } from '../task/task';
import './board.scss';

export const Board = () => {
  return (
    <li className="board-item">
      <h3>title</h3>
      <button>delete column</button>
      <button>add task</button>

      <ul className="task-list">
        <Task />
        <Task />
        <Task />
      </ul>
    </li>
  );
};

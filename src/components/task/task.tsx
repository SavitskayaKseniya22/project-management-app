import { TaskResponse } from '../../store/slices/types';

interface TaskProps {
  colId: string;
  task: TaskResponse;
}

export const Task = (props: TaskProps) => {
  return (
    <li className="task-item">
      Do something
      <button>X</button>
    </li>
  );
};

import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useDeleteTaskMutation, useGetTaskQuery } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { TaskResponse } from '../../store/slices/types';
import { ModalWindow } from '../modal-window/modal-window';

interface TaskProps {
  columnId: string;
  taskItem: TaskResponse;
  taskId: string;
  index: number;
}

export const Task = (props: TaskProps) => {
  const [taskRemovalToConfirm, setTaskRemovalToConfirm] = useState<boolean>(false);
  const [taskEditToConfirm, setTaskEditToConfirm] = useState<boolean>(false);
  const boardId = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const { columnId, id, title, description } = props.taskItem;
  const toggleTaskRemoval = () => {
    setTaskRemovalToConfirm(!taskRemovalToConfirm);
    console.log('task that will be removed', props.taskItem.title, props.taskItem.id);
  };
  const toggleTaskEdit = () => {
    setTaskEditToConfirm(!taskEditToConfirm);
  };
  const [skip, setSkip] = useState(false);

  const [deleteTask] = useDeleteTaskMutation();

  const dispatch = useTypedDispatch();

  const confirmRemoval = async () => {
    setSkip(true);
    console.log('task being deleted', props.taskItem.title, props.taskItem.id);
    await deleteTask({ taskId: id, boardId, columnId });
    toggleTaskRemoval();
  };

  return (
    <li className="task-item">
      <h4>{title}</h4>
      <p>{description}</p>
      <button onClick={toggleTaskRemoval}>Remove</button>
      <button onClick={toggleTaskEdit}>Edit</button>
      {taskRemovalToConfirm && (
        <ModalWindow
          reason="delete the task"
          declineFunction={() => {
            toggleTaskRemoval();
          }}
          confirmFunction={confirmRemoval}
        ></ModalWindow>
      )}
      {taskEditToConfirm && (
        <ModalWindow
          reason="edit the task"
          declineFunction={() => {
            toggleTaskEdit();
          }}
          confirmFunction={() => {
            return;
          }}
          optional={{
            columnId: columnId,
          }}
          task={props.taskItem}
        ></ModalWindow>
      )}
    </li>
  );
};

/*
   <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
*/

import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useDeleteTaskMutation, useGetTaskQuery } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { ModalWindow } from '../modal-window/modal-window';

interface TaskProps {
  columnId: string;
  /*task: TaskResponse;*/
  taskId: string;
  index: number;
}

export const Task = (props: TaskProps) => {
  const [taskRemovalToConfirm, setTaskRemovalToConfirm] = useState<boolean>(false);
  const [taskEditToConfirm, setTaskEditToConfirm] = useState<boolean>(false);
  const boardId = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const { columnId, taskId, index } = props;

  const toggleTaskRemoval = () => {
    setTaskRemovalToConfirm(!taskRemovalToConfirm);
  };
  const toggleTaskEdit = () => {
    setTaskEditToConfirm(!taskEditToConfirm);
  };
  const [skip, setSkip] = useState(false);

  const { data: task, error } = useGetTaskQuery(
    { taskId, columnId, boardId },
    {
      skip,
    }
  );
  const [deleteTask] = useDeleteTaskMutation();

  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  const confirmRemoval = async () => {
    setSkip(true);
    await deleteTask({ taskId, boardId, columnId });
    toggleTaskRemoval();
  };

  if (task)
    return (
      <Draggable draggableId={task.id} index={props.index}>
        {(provided, snapshot) => (
          <li
            className="task-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
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
                  columnId: task.columnId,
                }}
                task={task}
              ></ModalWindow>
            )}
          </li>
        )}
      </Draggable>
    );
  else return <></>;
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

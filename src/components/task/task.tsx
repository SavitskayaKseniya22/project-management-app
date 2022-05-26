import { useEffect, useState } from 'react';
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
      <li className="task-item">
        <div className="task-content">
          <h5>{task.title}</h5>
          <p className="task-description">{task.description}</p>
        </div>

        <div className="task-buttons">
          <button onClick={toggleTaskEdit} className="task-button task-edit">
            <i className="fa-solid fa-pen"></i>
          </button>

          <button onClick={toggleTaskRemoval} className="task-button task-delete">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>

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

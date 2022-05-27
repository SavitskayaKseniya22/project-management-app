import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';

import { TaskFormData, TaskRequest, TaskResponse } from '../../store/slices/types';
import { Form } from '../form';
import jwt_decode from 'jwt-decode';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../store/services/task.service';

import { errorSlice } from '../../store/slices';
import { useGetColumnQuery } from '../../store/services/column.service';
import { isConstructorDeclaration } from 'typescript';
import { boardSlice } from '../../store/slices/board.slice';
export interface TaskFormProps {
  columnId: string;
  closeFormFunction: () => void;
  task?: TaskResponse;
}
export interface ParsedToken {
  iat: number;
  login: string;
  userId: string;
}

function TaskCreationForm(props: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>();

  const { columnId } = props;

  const boardId = useTypedSelector((state: RootState) => state.boardSlice.board?.id) as string;
  const userToken = useTypedSelector((state: RootState) => state.auth.accessToken);
  const { userId } = jwt_decode(userToken as string) as ParsedToken;

  const [createTask, { error }] = useCreateTaskMutation();
  const [updateTask, { error: updateError }] = useUpdateTaskMutation();
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (!error && !updateError) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
    if (updateError) dispatch(errorSlice.actions.updateError(updateError));
  }, [dispatch, error]);

  const onSubmit = async (formData: TaskFormData) => {
    const task: TaskRequest = {
      ...formData,
      userId: userId,
    };
    if (props.task) {
      task.order = props.task.order;
      task.boardId = props.task.boardId;
      task.columnId = props.task.columnId;
    }
    console.log('task update', task);
    props.task
      ? await updateTask({ task, taskId: props.task.id, boardId: boardId, columnId: columnId })
      : await createTask({ task, boardId, columnId });
    props.closeFormFunction();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        label="Title"
        controlKey="taskTitleInput"
        className="form-input-text"
        defaultValue={props.task ? props.task.title : ''}
        errorMessage={errors.title?.message}
        {...register('title', { required: true })}
      />
      <Form.Control
        label="Description"
        controlKey="taskDescriptionInput"
        className="form-input-text"
        defaultValue={props.task ? props.task.description : ''}
        errorMessage={errors.description?.message}
        {...register('description', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit" className="button-orange button-big">
          {props.task ? 'Edit Task' : 'Create Task'}
        </Form.Button>
      </Form.Group>
    </Form>
  );
}
export default TaskCreationForm;

/*  "title": "Task: pet the cat",
  "done": false,
  "order": 1,
  "description": "Domestic cat needs to be stroked gently",
  "userId": "40af606c-c0bb-47d1-bc20-a2857242cde3"*/
/*

  "title": "Task: pet the cat",
  "order": 1,
  "description": "Domestic cat needs to be stroked gently",
  "userId": "40af606c-c0bb-47d1-bc20-a2857242cde3",
  "boardId": "8d3bad56-ad8a-495d-9500-18ae4d1de8dc",
  "columnId": "41344d09-b995-451f-93dc-2f17ae13a4a9"
}
*/

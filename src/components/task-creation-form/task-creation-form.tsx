import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useSignupQuery } from '../../store/services';
import { Column, TaskFormData, TaskRequest, TaskResponse } from '../../store/slices/types';
import { Form } from '../form';
import parseJwt from '../../utits/parse-jwt';
import jwt_decode from 'jwt-decode';
import { useCreateTaskMutation } from '../../store/services/task.service';
import { getMaxOrderFromData } from '../../utits/getMaxOrderFromData';
import { errorSlice } from '../../store/slices';
import { useGetColumnQuery } from '../../store/services/column.service';
export interface TaskFormProps {
  columnId: string;
  tasksAmount: string;
  closeFormFunction: () => void;
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
  const userToken = useTypedSelector((state: RootState) => state.authSlice.accessToken);
  const { userId } = jwt_decode(userToken as string) as ParsedToken;

  const { data } = useGetColumnQuery({ id: boardId, columnId });
  const [createTask, { error }] = useCreateTaskMutation();

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  const onSubmit = async (formData: TaskFormData) => {
    const task: TaskRequest = {
      ...formData,
      userId: userId,
      order: 1,
    };
    if (data && data.tasks.length) {
      task.order = getMaxOrderFromData(data.tasks) + 1;
    }
    await createTask({ task, boardId, columnId });
    props.closeFormFunction();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        label="Title"
        controlKey="taskTitleInput"
        className="form-input-text"
        errorMessage={errors.title?.message}
        {...register('title', { required: true })}
      />
      <Form.Control
        label="Description"
        controlKey="taskDescriptionInput"
        className="form-input-text"
        errorMessage={errors.description?.message}
        {...register('description', { required: true })}
      />
      <Form.Control
        label="Mark as done"
        type="checkbox"
        controlKey="taskDoneInput"
        errorMessage={errors.done?.message}
        {...register('done')}
      />
      <Form.Group>
        <Form.Button type="submit" className="button-orange button-big">
          Create Task
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

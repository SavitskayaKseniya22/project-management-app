import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { TaskFormData, TaskRequest, TaskResponse } from '../../store/slices/types';
import { Form } from '../form';
import jwt_decode from 'jwt-decode';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../store/services/task.service';
import { errorSlice } from '../../store/slices';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const boardId = location.pathname.slice(1);
  const userToken = useTypedSelector((state: RootState) => state.auth.accessToken);
  const { userId } = jwt_decode(userToken as string) as ParsedToken;

  const [createTask, { error: createTaskError }] = useCreateTaskMutation();
  const [updateTask, { error: updateTaskError }] = useUpdateTaskMutation();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!createTaskError && !updateTaskError) return;
    if (createTaskError) dispatch(errorSlice.actions.updateError(createTaskError));
    if (updateTaskError) dispatch(errorSlice.actions.updateError(updateTaskError));
  }, [dispatch, createTaskError, updateTaskError]);

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

    props.task
      ? await updateTask({ task, taskId: props.task.id, boardId: boardId, columnId: columnId })
      : await createTask({ task, boardId, columnId });
    props.closeFormFunction();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        label={t('modal.title')}
        controlKey="taskTitleInput"
        className="form-input-text"
        defaultValue={props.task ? props.task.title : ''}
        errorMessage={errors.title?.message}
        {...register('title', { required: true })}
      />
      <Form.Control
        label={t('modal.description')}
        controlKey="taskDescriptionInput"
        className="form-input-text"
        defaultValue={props.task ? props.task.description : ''}
        errorMessage={errors.description?.message}
        {...register('description', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">
          {props.task ? t('modal.editTask') : t('boardpage.newTask')}
        </Form.Button>
      </Form.Group>
    </Form>
  );
}
export default TaskCreationForm;

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { useSignupQuery } from '../../store/services';
import { TaskFormData } from '../../store/slices/types';
import { Form } from '../form';
import parseJwt from '../../utits/parse-jwt';
export interface TaskFormProps {
  colId: string;
}
function TaskCreationForm(props: TaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>();
  const { colId } = props;
  const boardId = useTypedSelector((state: RootState) => state.boardSlice.board?.id);
  const userToken = useTypedSelector((state: RootState) => state.authSlice.accessToken);
  const userId = 'I be a user Id';
  console.log('user id', userId);
  /*const [userData, setUserData] = useState<UserDataModel>();*/

  const dispatch = useTypedDispatch();

  /*const { error } = useSignupQuery(userData, {
        skip: !userData,
      });
    
      useEffect(() => {
        if (!error) return;
        if (error) dispatch(errorSlice.actions.updateError(error));
      }, [dispatch, error]);*/

  /*onSubmit={handleSubmit((data: UserDataModel) => {
        setUserData(data);
      })}*/

  return (
    <Form>
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

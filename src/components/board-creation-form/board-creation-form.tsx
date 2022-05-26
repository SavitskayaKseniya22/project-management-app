import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { BoardRequest } from '../../store/slices/types';
import { useTypedDispatch } from '../../store';
import { errorSlice } from '../../store/slices';
import { useCreateBoardMutation } from '../../store/services/boardList.service';

type LoginDataModel = BoardRequest;

type BoardDataModel = BoardRequest;
function BoardCreationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardDataModel>();

  const dispatch = useTypedDispatch();

  const [triggerBoardMutation, { error }] = useCreateBoardMutation();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  return (
    <Form
      onSubmit={handleSubmit((data: BoardDataModel) => {
        triggerBoardMutation(data);
      })}
    >
      <Form.Control
        label="Board Title"
        controlKey="BoardTitleInput"
        className="form-input-text"
        errorMessage={errors.title?.message}
        {...register('title', { required: true })}
      />
      <Form.Control
        label="Description"
        controlKey="boardDescriptionInput"
        type="textarea"
        className="form-input-text"
        errorMessage={errors.description?.message}
        {...register('description', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">Create board</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default BoardCreationForm;

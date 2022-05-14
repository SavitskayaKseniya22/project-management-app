import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useSigninQuery } from '../../store/services';
import { useEffect, useState } from 'react';
import { BoardRequest } from '../../store/slices/types';
import { useTypedDispatch } from '../../store';
import { authSlice, errorSlice } from '../../store/slices';
import { Link } from 'react-router-dom';
import { useCreateBoardMutation } from '../../store/services/boardList.service';
import { boardListSlice } from '../../store/slices/boardList.slice';

type LoginDataModel = BoardRequest;

type BoardDataModel = BoardRequest;
function BoardCreationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardDataModel>();

  /* const dispatch = useTypedDispatch();

  const [boardInfo, setBoardInfo] = useState<BoardDataModel>();
  */

  const [triggerBoardMutation] = useCreateBoardMutation();

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
        <Form.Button type="submit" className="button-orange button-big">
          Create board
        </Form.Button>
      </Form.Group>
    </Form>
  );
}

export default BoardCreationForm;

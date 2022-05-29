import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { BoardRequest } from '../../store/slices/types';
import { useTypedDispatch } from '../../store';
import { errorSlice } from '../../store/slices';
import { useCreateBoardMutation } from '../../store/services/boardList.service';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type BoardDataModel = BoardRequest;

function BoardCreationForm(props: { declineFunction: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardDataModel>();

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [triggerBoardMutation, { error }] = useCreateBoardMutation();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  return (
    <Form
      onSubmit={handleSubmit(async (data: BoardDataModel) => {
        await triggerBoardMutation(data);
        props.declineFunction();
        navigate('/main', { replace: true });
      })}
    >
      <Form.Control
        label={t('modal.title')}
        controlKey="BoardTitleInput"
        className="form-input-text"
        errorMessage={errors.title?.message}
        {...register('title', { required: true })}
      />
      <Form.Control
        label={t('modal.description')}
        controlKey="boardDescriptionInput"
        type="textarea"
        className="form-input-text"
        errorMessage={errors.description?.message}
        {...register('description', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">{t('header.newBoard')}</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default BoardCreationForm;

import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ColumnRequest } from '../../store/slices/types';
import { useTypedDispatch } from '../../store';
import { errorSlice } from '../../store/slices';
import { useCreateColumnMutation } from '../../store/services/column.service';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

type ColumnDataModel = ColumnRequest;

function ColumnCreationForm(props: { declineFunction: () => void }) {
  const location = useLocation();
  const id = location.pathname.slice(1);
  const [createColumn, { error }] = useCreateColumnMutation();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnDataModel>();

  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  const onSubmit = async (arg: ColumnDataModel) => {
    await createColumn({ column: { title: arg.title }, id: id as string });
    props.declineFunction();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        label={t('modal.title')}
        controlKey="ColumnTitleInput"
        className="form-input-text"
        errorMessage={errors.title?.message}
        {...register('title', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">{t('boardpage.newColumn')}</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default ColumnCreationForm;

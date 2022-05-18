import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { ColumnRequest, ColumnResponseAll } from '../../store/slices/types';
import { RootState, useTypedDispatch, useTypedSelector } from '../../store';
import { errorSlice } from '../../store/slices';

import {
  useCreateColumnMutation,
  useGetColumnListQuery,
} from '../../store/services/column.service';
import { getMaxOrderFromData } from '../../utits/getMaxOrderFromData';

type ColumnDataModel = ColumnRequest;

function ColumnCreationForm(props: { declineFunction: () => void }) {
  const id = useTypedSelector((state: RootState) => state.boardSlice.board?.id);
  const { data } = useGetColumnListQuery(id);
  const [createColumn, { error }] = useCreateColumnMutation();
  const dispatch = useTypedDispatch();

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
    arg.order = 1;

    if (data && data.length) {
      const maxValue = getMaxOrderFromData(data);
      arg.order = maxValue + 1;
    }

    await createColumn({ column: arg, id: id as string });
    props.declineFunction();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Control
        label="Column Title"
        controlKey="ColumnTitleInput"
        className="form-input-text"
        errorMessage={errors.title?.message}
        {...register('title', { required: true })}
      />

      <Form.Button type="submit" className="button-orange button-big">
        Create column
      </Form.Button>
    </Form>
  );
}

export default ColumnCreationForm;

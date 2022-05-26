import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTypedDispatch } from '../../store';
import { useUpdateColumnMutation } from '../../store/services/column.service';
import { errorSlice } from '../../store/slices';
import { ColumnResponseAll, ColumnRequest } from '../../store/slices/types';

export const EditTitle = (props: {
  id: string;
  column: ColumnResponseAll;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<{ title: string }>({ defaultValues: { title: props.column.title } });

  const [updateColumn, { error }] = useUpdateColumnMutation();

  const onSubmit = async () => {
    const column: ColumnRequest = {
      title: getValues().title,
      order: props.column.order,
    };
    await updateColumn({ column: column, id: props.id, columnId: props.column.id });
    props.setEditMode(false);
  };

  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (!error) return;
    if (error) dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)} className="column-edit-title">
      <input type="text" {...register('title', { required: true })} placeholder="Enter the title" />

      <button type="submit">
        <i className="fa-solid fa-check"></i>
      </button>
      <button>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </form>
  );
};

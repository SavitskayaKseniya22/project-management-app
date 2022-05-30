import { Form } from '../form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorFormatter } from '../../utits';
import { useTranslation } from 'react-i18next';
import {
  useDeleteProfileMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../../store/services/profile.service';
import { Spinner } from '../spinner/spinner';
import { UserDataModel } from '../../interfaces';
import { useEffect } from 'react';
import { errorSlice, useTypedDispatch } from '../../store';

const schema = yup
  .object({
    name: yup.string().required('profileEditor.errors.name_required'),
    login: yup.string().required(),
    password: yup.string().required('profileEditor.errors.password_required'),
  })
  .required();

function ProfileEditor({ profileId }: { profileId: string }) {
  const { data: profile, error: getProfileError } = useGetProfileQuery(profileId);
  const [deleteProfile, { error: deleteProfileError }] = useDeleteProfileMutation();
  const [updateProfile, { error: updataProfileError }] = useUpdateProfileMutation();
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataModel>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!deleteProfileError && !updataProfileError && !getProfileError) return;
    if (deleteProfileError) dispatch(errorSlice.actions.updateError(deleteProfileError));
    if (updataProfileError) dispatch(errorSlice.actions.updateError(updataProfileError));
    if (getProfileError) dispatch(errorSlice.actions.updateError(getProfileError));
  }, [dispatch, deleteProfileError, updataProfileError, getProfileError]);

  const deleteProfileHandler = async () => {
    await deleteProfile(profileId);
  };

  if (!profile) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit((data: UserDataModel) => {
        updateProfile({
          userId: profileId,
          userData: data,
        });
      })}
    >
      <Form.Control
        readOnly
        label={t('profileEditor.id')}
        controlKey="profileIdInput"
        className="form-input-text"
        defaultValue={profile.id}
      />
      <Form.Control
        label={t('profileEditor.name')}
        controlKey="nameInput"
        className="form-input-text"
        errorMessage={errorFormatter(errors.name)}
        defaultValue={profile.name}
        {...register('name', { required: true })}
      />
      <Form.Control
        readOnly
        label={t('profileEditor.login')}
        controlKey="loginInput"
        className="form-input-text"
        defaultValue={profile.login}
        {...register('login', { required: true })}
      />
      <Form.Control
        label={t('profileEditor.password')}
        controlKey="profilePasswordInput"
        className="form-input-text"
        errorMessage={errorFormatter(errors.password)}
        {...register('password', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">{t('profileEditor.update')}</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default ProfileEditor;

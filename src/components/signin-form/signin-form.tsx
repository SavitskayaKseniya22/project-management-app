import { Form } from '../form';
import { useForm } from 'react-hook-form';
import jwt_decode from 'jwt-decode';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSigninQuery } from '../../store/services';
import { useEffect, useState } from 'react';
import { SigninQueryRequest } from '../../store/services/types';
import { useTypedDispatch } from '../../store';
import { authSlice, errorSlice } from '../../store/slices';
import { errorFormatter } from '../../utits';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type LoginDataModel = SigninQueryRequest;

const schema = yup
  .object({
    login: yup
      .string()
      .required('signin.errors__login_required')
      .min(3, 'signin.errors__login_min_length'),
    password: yup.string().required('signin.errors__password_required'),
  })
  .required();

function SigninForm() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataModel>({
    resolver: yupResolver(schema),
  });

  const dispatch = useTypedDispatch();

  const [credentials, setCredentials] = useState<LoginDataModel>();
  const { t } = useTranslation();

  const { data, error } = useSigninQuery(credentials, {
    skip: !credentials,
  });

  useEffect(() => {
    if (!data) return;
    const { token } = data;
    dispatch(authSlice.actions.updateAccessToken(token));
  }, [dispatch, data]);

  useEffect(() => {
    if (!error) return;

    dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  return (
    <Form
      onSubmit={handleSubmit((data: LoginDataModel) => {
        setCredentials(data);
      })}
    >
      <Form.Control
        label={t('signin.login')}
        controlKey="loginInput"
        errorMessage={errorFormatter(errors.login, {
          minLength: 3,
          currentLength: getValues('login')?.length || 0,
        })}
        className="form-input-text"
        {...register('login', { required: true })}
      />
      <Form.Control
        label={t('signin.password')}
        controlKey="passwordInput"
        errorMessage={errorFormatter(errors.password)}
        className="form-input-text"
        {...register('password', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">{t('header.signin')}</Form.Button>
        <Link to="/signup">{t('header.signup')}</Link>
      </Form.Group>
    </Form>
  );
}

export default SigninForm;

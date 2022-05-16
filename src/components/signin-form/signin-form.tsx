import { Form } from '../form';
import { useForm } from 'react-hook-form';
import jwt_decode from 'jwt-decode';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSigninQuery } from '../../store/services';
import { useEffect, useState } from 'react';
import { SigninQueryRequest } from '../../store/services/types';
import { useTypedDispatch } from '../../store';
import { authSlice, updateUserNameActionCreator } from '../../store/slices';
import { errorFormatter } from '../../utits';
import { authSlice, errorSlice } from '../../store/slices';
import { Link } from 'react-router-dom';

type LoginDataModel = SigninQueryRequest;

const schema = yup
  .object({
    login: yup
      .string()
      .required('signin_form__errors__login_required')
      .min(3, 'signin_form__errors__login_min_length'),
    password: yup.string().required('signin_form__errors__password_required'),
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

  const { data, error } = useSigninQuery(credentials, {
    skip: !credentials,
  });

  useEffect(() => {
    if (!data) return;
    console.log(data);
    const { token } = data;
    const jwtPayload = jwt_decode<{ login: string }>(token);
    dispatch(authSlice.actions.updateAccessToken(token));
    dispatch(updateUserNameActionCreator(jwtPayload.login));
  }, [dispatch, data]);

  useEffect(() => {
    if (!error) return;
    console.log(error);
    dispatch(errorSlice.actions.updateError(error));
  }, [dispatch, error]);

  return (
    <Form
      onSubmit={handleSubmit((data: LoginDataModel) => {
        setCredentials(data);
      })}
    >
      <Form.Control
        label="Login"
        controlKey="loginInput"
        errorMessage={errorFormatter(errors.login, {
          minLength: 3,
          currentLength: getValues('login')?.length || 0,
        })}
        className="form-input-text"
        {...register('login', { required: true })}
      />
      <Form.Control
        label="Password"
        controlKey="passwordInput"
        errorMessage={errorFormatter(errors.password)}
        className="form-input-text"
        {...register('password', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit" className="button-orange button-big">
          Login
        </Form.Button>
        <Link to="/signup" className="button-orange button-big">
          Signup
        </Link>
      </Form.Group>
    </Form>
  );
}

export default SigninForm;

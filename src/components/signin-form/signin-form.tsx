import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useSigninQuery } from '../../store/services';
import { useEffect, useState } from 'react';
import { SigninQueryRequest } from '../../store/services/types';
import { useTypedDispatch } from '../../store';
import { authSlice } from '../../store/slices';

type LoginDataModel = SigninQueryRequest;

function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataModel>();

  const dispatch = useTypedDispatch();

  const [credentials, setCredentials] = useState<LoginDataModel>();

  const { data } = useSigninQuery(credentials, {
    skip: !credentials,
  });

  useEffect(() => {
    if (!data) return;
    const { token } = data;
    dispatch(authSlice.actions.updateAccessToken(token));
  }, [dispatch, data]);

  return (
    <Form
      onSubmit={handleSubmit((data: LoginDataModel) => {
        setCredentials(data);
      })}
    >
      <Form.Control
        label="Login"
        controlKey="loginInput"
        errorMessage={errors.login?.message}
        {...register('login', { required: true })}
      />
      <Form.Control
        label="Password"
        controlKey="passwordInput"
        errorMessage={errors.password?.message}
        {...register('password', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">Login</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default SigninForm;

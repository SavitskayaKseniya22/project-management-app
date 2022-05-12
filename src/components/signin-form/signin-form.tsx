import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useSigninQuery } from '../../store/services';
import { useEffect, useState } from 'react';
import { SigninQueryRequest } from '../../store/services/types';
import { useTypedDispatch } from '../../store';
import { authSlice } from '../../store/slices';
import { Link } from 'react-router-dom';

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
        className="form-input-text"
        errorMessage={errors.login?.message}
        {...register('login', { required: true })}
      />
      <Form.Control
        label="Password"
        controlKey="passwordInput"
        className="form-input-text"
        errorMessage={errors.password?.message}
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

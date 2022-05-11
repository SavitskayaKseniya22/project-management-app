import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSignupQuery } from '../../store/services';

interface UserDataModel {
  name: string;
  login: string;
  password: string;
}

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataModel>();

  const [userData, setUserData] = useState<UserDataModel>();

  useSignupQuery(userData, {
    skip: !userData,
  });

  return (
    <Form
      onSubmit={handleSubmit((data: UserDataModel) => {
        setUserData(data);
      })}
    >
      <Form.Control
        label="User name"
        controlKey="userNameInput"
        errorMessage={errors.name?.message}
        {...register('name', { required: true })}
      />
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
        <Form.Button type="submit">Submit</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default SignupForm;

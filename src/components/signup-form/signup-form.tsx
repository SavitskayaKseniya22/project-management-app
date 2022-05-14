import { Form } from '../form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSignupQuery } from '../../store/services';
import { errorFormatter } from '../../utits';

interface UserDataModel {
  name: string;
  login: string;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required('signup_form__errors__name_required'),
    login: yup
      .string()
      .required('signup_form__errors__login_required')
      .min(3, 'signup_form__errors__login_min_length'),
    password: yup.string().required('signin_form__errors__password_required'),
  })
  .required();

function SignupForm() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataModel>({
    resolver: yupResolver(schema),
  });

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
        errorMessage={errorFormatter(errors.name)}
        {...register('name', { required: true })}
      />
      <Form.Control
        label="Login"
        controlKey="loginInput"
        errorMessage={errorFormatter(errors.login, {
          minLength: 3,
          currentLength: getValues('login')?.length || 0,
        })}
        {...register('login', { required: true })}
      />
      <Form.Control
        label="Password"
        controlKey="passwordInput"
        errorMessage={errorFormatter(errors.password)}
        {...register('password', { required: true })}
      />
      <Form.Group>
        <Form.Button type="submit">Submit</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default SignupForm;

import { Form } from '../form';
import { useForm } from 'react-hook-form';

interface LoginDataModel {
  username: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useForm<LoginDataModel>();

  return (
    <Form>
      <Form.Control
        label="Login"
        controlKey="loginInput"
        errorMessage={errors.username?.message}
        {...register('username', { required: true })}
      />
      <Form.Control
        label="Password"
        controlKey="passwordInput"
        errorMessage={errors.password?.message}
        {...register('password')}
      />
      <Form.Group>
        <Form.Button type="submit">Login</Form.Button>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;

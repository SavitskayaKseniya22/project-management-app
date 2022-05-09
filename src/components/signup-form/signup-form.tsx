import { Form } from '../form';
import { useForm } from 'react-hook-form';

interface LoginDataModel {
  username: string;
  password: string;
}

function SignupForm() {
  const {
    register,
    formState: { errors },
  } = useForm<LoginDataModel>();

  return (
    <Form>
      <Form.Control
        label="User name"
        controlKey="emailInput"
        errorMessage={errors.username?.message}
        {...register('username', { required: true })}
      />
      <Form.Control
        label="Last name"
        controlKey="lastNameInput"
        errorMessage={errors.password?.message}
        {...register('password')}
      />
      <Form.Group>
        <Form.Button type="submit" />
      </Form.Group>
    </Form>
  );
}

export default SignupForm;

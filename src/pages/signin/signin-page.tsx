import { Link } from 'react-router-dom';
import { SigninForm } from '../../components/signin-form';

function AuthPage() {
  return (
    <div>
      <Link to="/signup">Signup</Link>
      <SigninForm />
    </div>
  );
}

export default AuthPage;

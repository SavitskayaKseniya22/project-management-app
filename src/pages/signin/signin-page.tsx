import { Link } from 'react-router-dom';
import { SigninForm } from '../../components/signin-form';
import './signin.scss';
function AuthPage() {
  return (
    <div className="signin-page">
      <Link to="/signup">Signup</Link>
      <SigninForm />
    </div>
  );
}

export default AuthPage;

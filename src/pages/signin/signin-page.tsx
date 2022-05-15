import { Link } from 'react-router-dom';
import { SigninForm } from '../../components/signin-form';
import './signin.scss';
function AuthPage() {
  return (
    <div className="signin-page">
      <SigninForm />
    </div>
  );
}

export default AuthPage;

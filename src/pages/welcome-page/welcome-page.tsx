import { RootState, useTypedSelector } from '../../store';
import './welcome-page.scss';
export function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1>Welcome to our app!</h1>
      <div className="buttons">
        <a href="/signin" className="button-orange button-big">
          {' '}
          Sign in
        </a>
        <a href="/signup" className="button-orange button-big">
          {' '}
          Sign up
        </a>
      </div>
    </div>
  );
}

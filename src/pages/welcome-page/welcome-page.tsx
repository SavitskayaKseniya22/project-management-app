import { FormattedMessage } from 'react-intl';

export function WelcomePage() {
  return (
    <h1>
      <FormattedMessage id="mainpage_welcome" defaultMessage="Welcome!" />
    </h1>
  );
}

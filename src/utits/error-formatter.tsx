import { FieldError } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

type ErrorFormatterValues = Record<string, string | React.ReactNode>;

function errorFormatter<E extends FieldError | undefined>(error: E, values?: ErrorFormatterValues) {
  if (error) {
    return <FormattedMessage id={error.message} values={values} />;
  }
}

export default errorFormatter;

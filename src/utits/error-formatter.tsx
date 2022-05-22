import i18next from 'i18next';
import { FieldError } from 'react-hook-form';

type ErrorFormatterValues = Record<string, string | React.ReactNode>;

function errorFormatter<E extends FieldError | undefined>(error: E, values?: ErrorFormatterValues) {
  if (error) {
    return i18next.t(`${error.message}`, {
      minLength: values?.minLength,
      currentLength: values?.currentLength,
    });
  }
}

export default errorFormatter;

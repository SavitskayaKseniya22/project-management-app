import classnames from 'classnames';
import { forwardRef } from 'react';
import { InnerRef } from '../../../interfaces';

export interface FormErrorProps extends React.HTMLAttributes<HTMLElement>, InnerRef<HTMLElement> {
  error?: string | React.ReactNode | null;
}

function FormError({ error, innerRef, className, ...props }: FormErrorProps) {
  if (!error) return null;

  return (
    <small ref={innerRef} className={classnames('form__error', className)} {...props}>
      {error}
    </small>
  );
}

export default forwardRef<HTMLLabelElement, FormErrorProps>((props, ref) => (
  <FormError innerRef={ref} {...props} />
));

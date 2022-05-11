import classnames from 'classnames';
import { forwardRef, useContext } from 'react';
import { InnerRef } from '../../../interfaces';
import { FormGroupContext } from './form-group';

export interface FormLabelProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    InnerRef<HTMLLabelElement> {
  htmlFor?: string;
}

function FormLabel({ htmlFor, innerRef, className, ...props }: FormLabelProps) {
  const context = useContext(FormGroupContext);
  return (
    <label
      ref={innerRef}
      htmlFor={htmlFor || context?.controlKey}
      className={classnames('form__label', className)}
      {...props}
    />
  );
}

export default forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => (
  <FormLabel innerRef={ref} {...props} />
));

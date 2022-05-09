import classnames from 'classnames';
import { forwardRef, useContext } from 'react';
import { InnerRef } from '../../../interfaces';
import { FormGroupContext } from './form-group';

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InnerRef<HTMLInputElement> {}

function FormInput({ id, innerRef, type, className, ...props }: FormInputProps) {
  const context = useContext(FormGroupContext);

  return (
    <input
      id={id || context?.controlKey}
      type={type}
      ref={innerRef}
      className={classnames('form__control', className)}
      {...props}
    />
  );
}

export default forwardRef<HTMLInputElement, FormInputProps>((props, ref) => (
  <FormInput innerRef={ref} {...props} />
));

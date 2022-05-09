import classnames from 'classnames';
import { forwardRef, useContext } from 'react';
import { InnerRef } from '../../../interfaces';
import { FormGroupContext } from './form-group';

export interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    InnerRef<HTMLButtonElement> {}

function FormButton({ id, innerRef, className, ...props }: FormButtonProps) {
  const context = useContext(FormGroupContext);

  return (
    <button
      id={id || context?.controlKey}
      ref={innerRef}
      className={classnames('form__btn', className)}
      {...props}
    />
  );
}

export default forwardRef<HTMLButtonElement, FormButtonProps>((props, ref) => (
  <FormButton innerRef={ref} {...props} />
));

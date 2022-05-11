import classnames from 'classnames';
import { forwardRef, useContext } from 'react';
import { InnerRef } from '../../../interfaces';
import { FormGroupContext } from './form-group';
import FormSelectOption, { FormSelectOptionProps } from './form-select-option';

type FormSelectProps = React.InputHTMLAttributes<HTMLSelectElement> & InnerRef<HTMLSelectElement>;

function FormSelect({ id, innerRef, className, ...props }: FormSelectProps) {
  const context = useContext(FormGroupContext);
  return (
    <select
      id={id || context?.controlKey}
      ref={innerRef}
      className={classnames('form__control', className)}
      {...props}
    />
  );
}

export default Object.assign(
  forwardRef<HTMLSelectElement, FormSelectProps>((props, ref) => (
    <FormSelect innerRef={ref} {...props} />
  )),
  {
    Option: forwardRef<HTMLOptionElement, FormSelectOptionProps>((props, ref) => (
      <FormSelectOption innerRef={ref} {...props} />
    )),
  }
);

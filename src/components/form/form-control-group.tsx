import React, { forwardRef } from 'react';
import { FormControlProps } from './form-control';
import { FormGroupProps } from './elements/form-group';
import Form from './form';
import classNames from 'classnames';

interface FormControlGroupProps extends Omit<FormGroupProps, 'controlKey'> {
  label?: string;
  errorMessage?: string;
  controlProps: FormControlProps[];
}

function FromControlGroup({
  innerRef,
  className,
  controlProps,
  label,
  errorMessage,
  ...props
}: FormControlGroupProps) {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <div ref={innerRef} className={classNames('form__control-group', className)} {...props}>
        {controlProps.map((controlProps, idx) => (
          <Form.Control key={idx} {...controlProps} />
        ))}
      </div>
      {errorMessage && <Form.Error error={errorMessage} />}
    </Form.Group>
  );
}

export default forwardRef<HTMLDivElement, FormControlGroupProps>((props, ref) => (
  <FromControlGroup innerRef={ref} {...props} />
));

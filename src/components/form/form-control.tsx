import classNames from 'classnames';
import React, { forwardRef, HTMLInputTypeAttribute } from 'react';
import { InnerRef } from '../../interfaces';
import Form from './form';

export interface FormControlProps
  extends React.HTMLAttributes<HTMLInputElement>,
    InnerRef<HTMLInputElement> {
  value?: string | number;
  controlKey?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string | React.ReactNode;
  className?: string;
  type?: HTMLInputTypeAttribute;
}

function FormControl({
  type,
  label,
  value,
  className,
  controlKey,
  placeholder,
  errorMessage,
  ...props
}: FormControlProps) {
  return (
    <Form.Group controlKey={controlKey}>
      <Form.Label>{label}</Form.Label>
      <Form.Input
        value={value}
        type={type ?? 'text'}
        className={classNames(type === 'file' && 'form__file', className)}
        placeholder={placeholder ?? label}
        {...props}
      />
      <Form.Error error={errorMessage} />
    </Form.Group>
  );
}

export default forwardRef<HTMLInputElement, FormControlProps>((props, ref) => (
  <FormControl innerRef={ref} {...props} />
));

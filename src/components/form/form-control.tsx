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
  errorMessage?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  defaultValue?: string | number;
}

function FormControl({
  type,
  label,
  value,
  className,
  controlKey,
  placeholder,
  errorMessage,
  defaultValue,
  ...props
}: FormControlProps) {
  return (
    <Form.Group controlKey={controlKey}>
      <Form.Label>{label}</Form.Label>
      <Form.Input
        value={value}
        defaultValue={defaultValue}
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

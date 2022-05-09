import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { InnerRef } from '../../interfaces';
import Form from './form';

export interface FormControlSelectOption {
  value: string | number;
  label: string;
}

export interface FormControlSelectProps
  extends React.HTMLAttributes<HTMLSelectElement>,
    InnerRef<HTMLSelectElement> {
  value?: string | number;
  controlKey?: string;
  label?: string;
  errorMessage?: string;
  className?: string;
  options: FormControlSelectOption[];
}

function FormControlSelect({
  controlKey,
  label,
  options,
  errorMessage,
  className,
  value,
  ...props
}: FormControlSelectProps) {
  return (
    <Form.Group controlKey={controlKey}>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} className={classNames('form__select', className)} {...props}>
        {options.map((option, idx) => (
          <Form.Select.Option key={idx} value={option.value}>
            {option.label}
          </Form.Select.Option>
        ))}
      </Form.Select>
      <Form.Error error={errorMessage} />
    </Form.Group>
  );
}

export default forwardRef<HTMLSelectElement, FormControlSelectProps>((props, ref) => (
  <FormControlSelect innerRef={ref} {...props} />
));

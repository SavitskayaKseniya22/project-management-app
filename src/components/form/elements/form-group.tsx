import classNames from 'classnames';
import React from 'react';
import { forwardRef } from 'react';
import { InnerRef } from '../../../interfaces';

export interface FormGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    InnerRef<HTMLDivElement> {
  controlKey?: string;
}

export const FormGroupContext = React.createContext<{
  controlKey?: string;
} | null>(null);

function FormGroup({ controlKey, innerRef, className, children, ...props }: FormGroupProps) {
  return (
    <FormGroupContext.Provider
      value={{
        controlKey,
      }}
    >
      <div ref={innerRef} className={classNames('form__group', className)} {...props}>
        {children}
      </div>
    </FormGroupContext.Provider>
  );
}

export default forwardRef<HTMLDivElement, FormGroupProps>((props, ref) => (
  <FormGroup innerRef={ref} {...props} />
));

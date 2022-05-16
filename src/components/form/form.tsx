import { forwardRef } from 'react';
import classnames from 'classnames';
import { InnerRef } from '../../interfaces';
import { FormGroup, FormInput, FormLabel, FormError, FormSelect, FormButton } from './elements';
import FormControl from './form-control';
import FormControlGroup from './form-control-group';
import formControlSelect from './form-control-select';
import './form.scss';

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & InnerRef<HTMLFormElement>;

function Form({ innerRef, children, className, ...props }: FormProps) {
  return (
    <form ref={innerRef} className={classnames('form', className)} {...props}>
      {children}
    </form>
  );
}

export default Object.assign(
  forwardRef<HTMLFormElement, FormProps>((props, ref) => <Form innerRef={ref} {...props} />),
  {
    Group: FormGroup,
    Input: FormInput,
    Label: FormLabel,
    Error: FormError,
    Select: FormSelect,
    Button: FormButton,
    Control: FormControl,
    ControlGroup: FormControlGroup,
    ControlSelect: formControlSelect,
  }
);

import { InnerRef } from '../../../interfaces';

export type FormSelectOptionProps = React.OptionHTMLAttributes<HTMLOptionElement> &
  InnerRef<HTMLOptionElement>;

function FormSelectOption({ innerRef, ...props }: FormSelectOptionProps) {
  return <option ref={innerRef} {...props} />;
}

export default FormSelectOption;

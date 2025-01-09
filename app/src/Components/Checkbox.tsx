import { forwardRef, InputHTMLAttributes } from 'react';
import { Stack } from './Stack';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const checkBoxClass = 'cursor-pointer mr-[6px] h-4 outline-gray-200 hover:outline-gray-600 rounded';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, ...props }, ref) => {
  return (
    <Stack
      align="center"
      className="cursor-pointer text-gray-400 hover:text-gray-600 dark:text-gray-300"
    >
      <input {...props} id={props.name} className={checkBoxClass} type="checkbox" ref={ref} />
      {label && (
        <label htmlFor={props.name} className="cursor-pointer">
          {label}
        </label>
      )}
    </Stack>
  );
});

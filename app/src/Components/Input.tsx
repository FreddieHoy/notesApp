import cn from 'classnames';
import { forwardRef, InputHTMLAttributes, Ref, TextareaHTMLAttributes } from 'react';
import { Stack } from './Stack';
import { cls } from './StyleUtils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        {...props}
        className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        ref={ref}
      />
    );
  },
);

type TextAreaProps = { canResize?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef(
  ({ canResize = false, ...props }: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        {...props}
        className={cn(
          cls(
            `h-[200px] w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200`,
          ),
          props.className,
        )}
        ref={ref}
      />
    );
  },
);

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

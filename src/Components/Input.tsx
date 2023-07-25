import React, { forwardRef, InputHTMLAttributes, Ref, TextareaHTMLAttributes } from "react";
import { Stack } from "./Stack";
import { cls } from "./StyleUtils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        {...props}
        className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        ref={ref}
      />
    );
  }
);

type TextAreaProps = { canResize?: boolean } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef(
  ({ canResize = false, ...props }: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    return (
      <textarea
        {...props}
        className={cls(
          `p-2 w-full h-[200px] rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200`
        )}
        ref={ref}
      />
    );
  }
);

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const checkBoxClass = "cursor-pointer mr-[6px] h-4 outline-gray-200 hover:outline-gray-600 rounded";

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

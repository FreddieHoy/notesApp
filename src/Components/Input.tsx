import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Stack } from "./Stack";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
  );
};

export const Textarea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      className={"p-2 border-r-2 w-full h-[100px] resize-none rounded border border-gray-300"}
    />
  );
};

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const checkBoxClass =
  "bg-amber-200 hover:bg-amber-400 cursor-pointer w-8 h-8 border-3 border-rose-500 rounded checked:bg-green-500 ";
export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <Stack gap={6} align="center">
      <input {...props} className={checkBoxClass} type="checkbox" />
      {label && (
        <label htmlFor={props.name} className="ml-3">
          {label}
        </label>
      )}
    </Stack>
  );
};

import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    />
  );
};

export const Textarea = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  return (
    <textarea
      {...props}
      className={
        "p-2 border-r-2 w-full h-[100px] resize-none rounded border border-gray-300"
      }
    />
  );
};

const checkBoxClass =
  "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={checkBoxClass} type="checkbox" />;
};

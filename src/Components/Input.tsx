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
  return <textarea {...props} className={"px-2 border-r-2"} />;
};

export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={"px-2"} type="checkbox" />;
};

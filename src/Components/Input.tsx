import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={"px-2 border-r-2"} />;
};

export const Textarea = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  return <textarea {...props} className={"px-2 border-r-2"} />;
};

export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={"px-2"} type="checkbox" />;
};

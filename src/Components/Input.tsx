import React, { InputHTMLAttributes } from "react";

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className={"px-2"} />;
};

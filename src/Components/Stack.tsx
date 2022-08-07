import { ReactNode } from "react";
import { match } from "ts-pattern";
import { cls } from "./Button";

export type StackProps = {
  maxWidth?: number | string;

  maxHeight?: number | string;

  padding?: number | string;

  gap?: number | string;

  fixedHeight?: number | string;

  align?: "start" | "end" | "center" | "baseline" | "stretch";

  inline?: boolean;

  borderBottom?: boolean;

  justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "baseline";

  grow?: boolean | number | "inherit" | "initial" | "unset";

  shrink?: boolean | number | "inherit" | "initial" | "unset";

  wrap?: "wrap" | "wrap-reverse" | "nowrap" | "inherit" | "initial" | "unset";

  vertical?: boolean;

  reverse?: boolean;

  basis?: string;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Stack = ({
  children,
  maxHeight,
  maxWidth,
  padding,
  gap,
  align,
  basis,
  borderBottom,
  fixedHeight,
  grow,
  justify,
  reverse,
  shrink,
  vertical,
  wrap,
  style,
  className,
  ...props
}: StackProps) => {
  const inlineStyles: React.CSSProperties = {
    gap,
    maxHeight,
    maxWidth,
    padding,
    justifyContent: justify,
    alignItems: align,
    height: fixedHeight,
    flexBasis: basis,
    borderBottom: borderBottom ? "1px solid grey" : "0",
    flexWrap: wrap,
    ...style,
  };

  return (
    <div
      className={cls(`
      flex
      ${convertGrow(grow)}
      ${getFlexDirection(!!vertical, !!reverse)}
      ${shrink ? "shrink" : ""}
      ${className ?? ""}
    `)}
      style={inlineStyles}
      {...props}
    >
      {children}
    </div>
  );
};

const convertGrow = (growProp: StackProps["grow"]): string => {
  if (typeof growProp === "number") {
    return `grow-[${growProp}]`; // This won't work
  }

  switch (growProp) {
    case true:
      return "grow";
    case false:
      return "";
  }

  return "";
};

const getFlexDirection = (vertical: boolean, reverse: boolean) => {
  return match({ vertical, reverse })
    .with({ vertical: false, reverse: false }, () => "flex-row")
    .with({ vertical: true, reverse: false }, () => "flex-col")
    .with({ vertical: false, reverse: true }, () => "flex-row-reverse")
    .with({ vertical: true, reverse: true }, () => "flex-col-reverse")
    .exhaustive();
};

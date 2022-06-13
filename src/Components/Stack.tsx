import { ReactNode } from "react";
import { match } from "ts-pattern";
export interface StackProps {
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
}

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
  inline,
  justify,
  reverse,
  shrink,
  vertical,
  wrap,
}: StackProps) => {
  const inlineStyles: React.CSSProperties = {
    gap,
    maxHeight,
    maxWidth,
    padding,
    justifyContent: justify,
  };

  return (
    <div
      className={`
      // items-[${align}]
      // ${inline ? "inline-" : ""}flex
      // h-[${fixedHeight || "auto"}]
      // basis-${basis}
      // border-b-${borderBottom || "0"}


      border-grey
      ${convertGrow(grow)}
      ${getFlexDirection(!!vertical, !!reverse)}
      ${shrink ? "shrink" : ""}
      ${wrap || "no-wrap"}
    `}
      style={inlineStyles}
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

import { HTMLAttributes } from "react";
import { Button } from "../Components";
import { P } from "../Components/Typography";
import { Theme } from "./Home";

export const FooterWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={"flex h-20 w-full box-border gap-6"}>
      {props.children}
    </div>
  );
};

export const Footer = ({
  handleLogout,
  handleToggleTheme,
  setTheme,
  theme,
}: {
  handleLogout: () => void;
  handleToggleTheme: (val: Theme) => void;
  setTheme: (val: Theme) => void;
  theme: Theme;
}) => {
  return (
    <FooterWrapper>
      <Button
        intent="secondary"
        size="small"
        type="button"
        onClick={() => handleLogout()}
      >
        <P>Logout</P>
      </Button>
      <Button
        intent="secondary"
        size="small"
        type="button"
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
          handleToggleTheme(theme === "light" ? "dark" : "light");
        }}
      >
        <P>{theme === "light" ? "Dark Theme" : "Light Theme"}</P>
      </Button>
    </FooterWrapper>
  );
};

import { useState } from "react";
import { useAuth } from "../Auth";
import { Button } from "../Components";
import { Stack } from "../Components/Stack";
import { H2, P } from "../Components/Typography";
import { useApi } from "../useApi";

type Theme = "light" | "dark";

export const Profile = () => {
  const { me, logout } = useAuth();
  const api = useApi();
  const userId = me?.id;

  const [theme, setTheme] = useState<Theme>();

  const handleLogout = async () => {
    await api
      .post("/logout", {
        userId: userId,
      })
      .catch((e) => {
        console.error("Failed to log out: ", e);
      })
      .then(() => {
        logout();
      });
  };

  const handleToggleTheme = (theme: Theme) => {
    const htmlRoot = document.getElementsByTagName("html")[0];

    if (theme === "dark") {
      htmlRoot.setAttribute("class", "dark");
    } else {
      htmlRoot.removeAttribute("class");
    }
  };

  return (
    <Stack vertical className="w-full" gap={12}>
      <H2>Welome to Jotter, {me?.name}.</H2>
      <Stack gap={6} vertical>
        <Button intent="secondary" size="small" type="button" onClick={() => handleLogout()}>
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
      </Stack>
    </Stack>
  );
};

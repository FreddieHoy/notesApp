import { useAuth } from "../Auth";
import { Button } from "../Components";
import { Stack } from "../Components/Stack";
import { H2, P } from "../Components/Typography";
import { useApi } from "../useApi";
import { Theme, useGlobal, useGlobalDispatch } from "../Utils/GlobalContext";

export const Profile = () => {
  const { me, logout } = useAuth();
  const api = useApi();
  const userId = me?.id;

  const { theme } = useGlobal();
  const dispatch = useGlobalDispatch();

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
      dispatch({ type: "setTheme", theme });
    } else {
      htmlRoot.removeAttribute("class");
    }
  };

  return (
    <Stack vertical className="w-full" gap={12}>
      <H2>Welcome to Jotter, {me?.name}.</H2>
      <Stack gap={6} vertical>
        <Button intent="secondary" size="small" type="button" onClick={() => handleLogout()}>
          <P>Logout</P>
        </Button>
        <Button
          intent="secondary"
          size="small"
          type="button"
          onClick={() => handleToggleTheme(theme === "light" ? "dark" : "light")}
        >
          <P>{theme === "light" ? "Dark Theme" : "Light Theme"}</P>
        </Button>
      </Stack>
    </Stack>
  );
};

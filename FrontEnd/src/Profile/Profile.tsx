import { useAuth } from "../Global/Auth";
import { Button } from "../Components";
import { Stack } from "../Components/Stack";
import { H2, H3, P } from "../Components/Typography";
import { useApi } from "../Utils/useApi";
import { Theme, useGlobal, useGlobalDispatch } from "../Global/GlobalContext";

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
    dispatch({ type: "setTheme", theme });

    if (theme === "dark") {
      htmlRoot.setAttribute("class", "dark");
    } else {
      htmlRoot.removeAttribute("class");
    }
  };

  return (
    <Stack vertical className="w-full" gap={12} padding={24}>
      <H2>Welcome to Jotter, {me?.name}.</H2>
      <Stack gap={24} vertical>
        <Stack gap={12} vertical>
          <H3>Theme</H3>
          <Stack gap={12}>
            <Stack gap={12}>
              <input
                type="radio"
                id="light"
                name="theme"
                value={"light"}
                defaultChecked={theme === "light"}
                onClick={() => handleToggleTheme("light")}
              />
              <label htmlFor="light" className="dark:text-gray-300">
                Light
              </label>
            </Stack>

            <Stack gap={12}>
              <input
                type="radio"
                id="dark"
                name="theme"
                value={"dark"}
                onClick={() => handleToggleTheme("dark")}
              />
              <label htmlFor="dark" className="dark:text-gray-300">
                Dark
              </label>
            </Stack>
          </Stack>
        </Stack>

        <Button intent="secondary" size="small" type="button" onClick={() => handleLogout()}>
          <P>Logout</P>
        </Button>
      </Stack>
    </Stack>
  );
};

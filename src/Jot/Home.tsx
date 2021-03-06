import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { Footer } from "./Footer";
import { useApi } from "../useApi";
import { Header } from "./Header";
import { Body } from "./Body";

export type Note = {
  id: string;
  heading: string;
  content: string;
  todoitem: boolean;
  checked: boolean;
};

export type Theme = "light" | "dark";

export const Jot = () => {
  const { logout } = useAuth();
  const { me } = useAuth();
  const userId = me?.id;

  const api = useApi();

  const [notes, setNotes] = useState<Note[]>([]);
  const [theme, setTheme] = useState<Theme>("light");

  const handleToggleTheme = (theme: Theme) => {
    const htmlRoot = document.getElementsByTagName("html")[0];

    if (theme === "dark") {
      htmlRoot.setAttribute("class", "dark");
    } else {
      htmlRoot.removeAttribute("class");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const res = await api.get("/notes");
          setNotes(res.data as Note[]);
        } catch (e) {
          console.error("notes error", e);
        }
      }
    };

    fetchData();
    // api, dep is removed to prevent endless rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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

  const refetchNotes = async () => {
    if (userId) {
      try {
        const res = await api.get("/notes");
        setNotes(res.data as Note[]);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  return (
    <>
      <div
        className={
          "flex flex-col h-screen w-screen p-8 box-border gap-3 dark:bg-gray-800 overflow-hidden"
        }
      >
        <Header refetchNotes={refetchNotes} />
        <Body notes={notes} refetchNotes={refetchNotes} />
        <Footer
          handleLogout={handleLogout}
          theme={theme}
          handleToggleTheme={handleToggleTheme}
          setTheme={setTheme}
        />
      </div>
    </>
  );
};

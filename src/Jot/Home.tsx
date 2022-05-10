import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { Button } from "../Components/Button";
import { Footer } from "./Footer";
import { useApi } from "../useApi";
import { Header } from "./Header";
import { Body } from "./Body";
import { P } from "../Components/Typography";

export type Note = { id: string; heading: string; content: string };

type Theme = "light" | "dark";

export const Jot = () => {
  const { logout } = useAuth();
  const { userId } = useAuth();

  const api = useApi();

  const [notes, setNotes] = useState<Note[]>([]);
  const [theme, setTheme] = useState("light");

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
          console.log("error", e);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className={
          " flex flex-col h-screen w-screen p-8 box-border gap-3 dark:bg-gray-800"
        }
      >
        <Header setNotes={setNotes} />
        <Body notes={notes} />
        <Footer>
          <Button type="button" onClick={logout}>
            <P>Logout</P>
          </Button>
          <Button
            type="button"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
              handleToggleTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <P>{theme === "light" ? "Dark Theme" : "Light Theme"}</P>
          </Button>
        </Footer>
      </div>
    </>
  );
};

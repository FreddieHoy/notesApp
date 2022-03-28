import { useEffect, useState } from "react";
import { auth, useAuth } from "../Auth";
import { Button } from "../Components/Button";
import { Dialog } from "../Components/Modal";
import { Body, Footer, Header } from "../Components/StandardLayout";
import { useApi } from "../useApi";
import { NewNote } from "./NewNote";

// need to match with BE
type Note = { id: string; heading: string; content: string };

export const Jot = () => {
  const { logout } = useAuth();
  const { token } = auth.getUser();

  const api = useApi();

  const [notes, setNotes] = useState<Note[]>([]);
  const [newIsOpen, setNewIsOpen] = useState(false);

  const fetchData = async () => {
    if (token) {
      try {
        const res = await api.get("/notes");
        setNotes(res.data as Note[]);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
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
      <div className={"flex flex-col h-screen w-screen p-8 box-border gap-3"}>
        <Header>
          <div>Home! Welcome back Jotter</div>
          <Button type="button" onClick={() => setNewIsOpen(true)}>
            Add +
          </Button>
        </Header>
        <Body>
          <div className="flex flex-col gap-4 ">
            {notes.map((note) => {
              return (
                <div key={note.id}>
                  <h1>{"id: " + note.id}</h1>
                  <h2>{note.heading}</h2>
                  <p>{note.content}</p>
                </div>
              );
            })}
          </div>
        </Body>
        <Footer>
          <Button type="button" onClick={logout}>
            Logout
          </Button>
        </Footer>
      </div>
      <Dialog
        isOpen={newIsOpen}
        onClose={() => setNewIsOpen(false)}
        title="Create new note"
      >
        <NewNote
          refetchNotes={() => fetchData()}
          onClose={() => setNewIsOpen(false)}
        />
      </Dialog>
    </>
  );
};

import { useEffect, useState } from "react";
import { auth, useAuth } from "../Auth";
import { Button } from "../Components/Button";
import { Dialog } from "../Components/Modal";
import { Body, Footer, Header } from "../Components/StandardLayout";
import { useApi } from "../useApi";
import { NewNote } from "./NewNote";

export const Jot = () => {
  const { logout } = useAuth();
  const { token } = auth.getUser();

  const api = useApi();

  const [notes, setNotes] = useState([]);
  const [newIsOpen, setNewIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const res = await api.get("/notes");
          console.log("RESULT", res);
        } catch (e) {
          console.log("error", e);
        }
      }
    };

    fetchData();
  }, [api, token]);

  return (
    <>
      <div className={"flex flex-col h-screen w-screen p-8 box-border gap-3"}>
        <Header>
          <div>Home! Welcome back Jotter</div>
          <Button type="button" onClick={() => setNewIsOpen(true)}>
            Add +
          </Button>
          {newIsOpen ? "true" : "false"}
        </Header>
        <Body>
          {notes.map((note) => {
            return <div>note</div>;
          })}
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
        <NewNote refetchNotes={() => {}} />
      </Dialog>
    </>
  );
};

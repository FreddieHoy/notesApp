import { useState } from "react";
import { auth } from "../Auth";
import { Button } from "../Components";
import { Dialog } from "../Components/Modal";
import { P } from "../Components/Typography";
import { useApi } from "../useApi";
import { Note } from "./Home";
import { NewNote } from "./NewNote";

export const Header = ({ setNotes }: { setNotes: (notes: Note[]) => void }) => {
  const [newIsOpen, setNewIsOpen] = useState(false);
  const { token } = auth.getUser();
  const api = useApi();

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

  return (
    <>
      <div
        className={
          "flex flex-col h-40 w-full border-b border-gray-800 box-border justify-between p-6 dark:border-white dark:bg-gray-700"
        }
      >
        <P>Home! Welcome back Jotter</P>
        <Button type="button" onClick={() => setNewIsOpen(true)}>
          <P>Add +</P>
        </Button>
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

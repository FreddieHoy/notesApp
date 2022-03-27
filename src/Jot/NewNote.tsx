import { useState } from "react";
import { auth } from "../Auth";
import { Button, Checkbox, Input, Textarea } from "../Components";
import { useApi } from "../useApi";

export const NewNote = ({ refetchNotes }: { refetchNotes: () => void }) => {
  const api = useApi();
  const [heading, setHeading] = useState("");
  const [note, setNote] = useState("");
  const [isToDo, setIsToDo] = useState(false);
  const { userId } = auth.getUser();

  const onSubmit = async () => {
    await api
      .post("/notes", {
        userId,
        heading,
        content: note,
        toDoItem: isToDo,
      })
      .then((res) => {
        refetchNotes();
        console.log("success", res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div>
      <form>
        <div className="px-2 py-1 gap-1 flex">
          <label htmlFor="content">Name:</label>
          <Input
            name="heading"
            className="border"
            type="heading"
            id="heading"
            placeholder="A thought on Russia"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="px-2 py-1 gap-1 flex">
          <label htmlFor="note">Note:</label>
          <Textarea
            name="note"
            className="border"
            id="note"
            placeholder="John@doe.com"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="px-2 py-1 gap-1 flex">
          <label htmlFor="toDo">Is to do:</label>
          <Checkbox
            name="toDo"
            className="border"
            type="toDo"
            id="toDo"
            checked={isToDo}
            onChange={(e) => setIsToDo(e.target.checked)}
          />
        </div>
        <Button onClick={() => onSubmit()} type="button">
          Add
        </Button>
      </form>
    </div>
  );
};

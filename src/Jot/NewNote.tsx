import { useState } from "react";
import { useAuth } from "../Auth";
import { Button, Checkbox, Input, Textarea } from "../Components";
import { P } from "../Components/Typography";
import { useApi } from "../useApi";

export const NewNote = ({
  refetchNotes,
  onClose,
}: {
  refetchNotes: () => void;
  onClose: () => void;
}) => {
  const api = useApi();
  const [heading, setHeading] = useState("");
  const [note, setNote] = useState("");
  const [isToDo, setIsToDo] = useState(false);
  const { me } = useAuth();
  const userId = me?.id;

  const onSubmit = async () => {
    await api
      .post("/notes", {
        userId,
        heading,
        content: note,
        todoitem: isToDo,
      })
      .then((res) => {
        refetchNotes();
        console.log("success", res.data);
        onClose();
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div>
      <form>
        <div className="px-2 py-1 gap-1 flex">
          <label htmlFor="content">
            <P>Header:</P>
          </label>
          <Input
            name="heading"
            className="border"
            type="heading"
            id="heading"
            placeholder="Dinner idea"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="px-2 py-1 gap-1 flex">
          <label htmlFor="note">
            <P>Note:</P>
          </label>
          <Textarea
            name="note"
            className="border"
            id="note"
            placeholder="I will need..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="px-2 py-1 gap-1 flex">
          <label htmlFor="toDo">
            <P>Is to do:</P>
          </label>
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
          <P>Add +</P>
        </Button>
      </form>
    </div>
  );
};

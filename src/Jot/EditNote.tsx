import { useState } from "react";
import { Button, Checkbox, Input, Textarea } from "../Components";
import { P } from "../Components/Typography";
import { useApi } from "../useApi";
import { Note } from "./Home";

export const EditNote = ({
  refetchNotes,
  onClose,
  note,
}: {
  refetchNotes: () => void;
  onClose: () => void;
  note: Note;
}) => {
  const api = useApi();
  const [heading, setHeading] = useState(note.heading);
  const [content, setContent] = useState(note.content);
  const [isToDo, setIsToDo] = useState(note.todoitem);

  const onSubmit = async () => {
    await api
      .put(`/notes/${note.id}`, {
        id: note.id,
        heading,
        content,
        toDoItem: isToDo,
      })
      .then(() => {
        refetchNotes();
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
          <P>Save</P>
        </Button>
      </form>
    </div>
  );
};

import { useState } from "react";
import { Button, Checkbox, Input, Textarea } from "../Components";
import { Stack } from "../Components/Stack";
import { P } from "../Components/Typography";
import { useApi } from "../useApi";
import { Note } from "./Tasks";

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
        todoitem: isToDo,
      })
      .then(async () => {
        await refetchNotes();
        onClose();
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleDeleteNote = async (noteId: string) => {
    await api
      .delete(`/notes/${noteId}`)
      .then(async () => {
        await refetchNotes();
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <>
      <section className="text-gray-600 body-font w-[600px]">
        <div className="w-full bg-gray-100 rounded-lg p-8 flex flex-col ">
          <div className="flex justify-between">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Edit</h2>
            <Button size="small" intent="secondary" onClick={() => onClose()}>
              Close
            </Button>
          </div>
          <div className="relative mb-4">
            <label htmlFor="heading" className="leading-7 text-sm text-gray-600">
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
          <div className="relative mb-4">
            <label htmlFor="note" className="leading-7 text-sm text-gray-600">
              Note
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
          <label htmlFor="toDo" className="pb-6">
            <Checkbox
              name="toDo"
              className="border"
              type="toDo"
              id="toDo"
              checked={isToDo}
              onChange={(e) => setIsToDo(e.target.checked)}
              label={"Is Task"}
            />
          </label>
          <Stack gap={6} justify="space-between" className="w-full">
            <Button onClick={() => onSubmit()} type="button">
              <P>Save</P>
            </Button>
            <Button intent="secondary" onClick={() => handleDeleteNote(note.id)}>
              Delete
            </Button>
          </Stack>
        </div>
      </section>
    </>
  );
};

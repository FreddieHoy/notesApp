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
      .then(async (res) => {
        await refetchNotes();
        onClose();
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <section className="text-gray-600 body-font w-[600px]">
      <div className="w-full bg-gray-100 rounded-lg p-8 flex flex-col ">
        <div className="flex justify-between">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            New Note
          </h2>
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
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <label htmlFor="toDo" className="pb-6">
          <P>Is to do:</P>
          <Checkbox
            name="toDo"
            className="border"
            type="toDo"
            id="toDo"
            checked={isToDo}
            onChange={(e) => setIsToDo(e.target.checked)}
          />
        </label>
        <Button onClick={() => onSubmit()} type="button" fullWidth={true}>
          <P>Add +</P>
        </Button>
      </div>
    </section>
  );
};

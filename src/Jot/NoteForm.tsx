import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Page } from "../App";
import { useAuth } from "../Auth";
import { Button, Checkbox, Input, Textarea } from "../Components";
import { Stack } from "../Components/Stack";
import { P } from "../Components/Typography";
import { useApi } from "../useApi";
import { useGlobalDispatch } from "../Utils/GlobalContext";
import { useGetNote, useNotes } from "../Utils/NoteContext";

type NoteFormValues = {
  id: string;
  heading: string;
  body: string;
  isToDo: boolean;
  checked: boolean;
};

export const NoteForm = ({ id }: { id?: string }) => {
  const note = useGetNote(id);
  console.log("note", note);
  if (note && id) {
    return (
      <Form
        initialValues={{
          id,
          body: note.content,
          checked: note.checked,
          heading: note.heading,
          isToDo: note.todoitem,
        }}
        noteId={id}
      />
    );
  }
  return <Form noteId={id} />;
};

const Form = ({
  initialValues,
  noteId,
}: {
  initialValues?: NoteFormValues;
  noteId: string | undefined;
}) => {
  const dispatch = useGlobalDispatch();
  const setPage = useCallback((page: Page) => dispatch({ type: "setPage", page }), [dispatch]);
  const { refetchNotes } = useNotes();

  const api = useApi();
  const { me } = useAuth();
  const userId = me?.id;

  const isEdit = useMemo(() => !!initialValues?.id, [initialValues?.id]);

  const onSubmit = useCallback(
    async (values: NoteFormValues) => {
      const endpoint = noteId ? `/notes/${noteId}` : "/notes";
      const vars = {
        userId,
        heading: values.heading,
        content: values.body,
        todoitem: values.isToDo,
        checked: values.checked,
      };

      const request = noteId ? api.put(endpoint, vars) : api.post(endpoint, vars);

      Promise.resolve(request)
        .then(async (res) => {
          await refetchNotes();
          setPage(values.isToDo ? "tasks" : "notes");
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    [api, noteId, refetchNotes, setPage, userId]
  );

  const onDeleteNote = useCallback(async () => {
    if (initialValues?.id) {
      await api.delete(`notes/${initialValues.id}`).then(async (res) => {
        await refetchNotes();
        setPage(initialValues.isToDo ? "tasks" : "notes");
      });
    }
  }, [api, initialValues?.id, initialValues?.isToDo, refetchNotes, setPage]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<NoteFormValues>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full rounded-lg flex flex-col">
        <div className="relative mb-4">
          {/* <label htmlFor="heading" className="leading-7 text-sm text-gray-600">
            <P>Header:</P>
          </label> */}
          <Input
            className="border"
            {...register("heading", { required: "A heading is required" })}
            placeholder="Header"
          />
          {errors.heading && <p>{errors.heading.message}</p>}
        </div>
        <div className="relative mb-4">
          {/* <label htmlFor="note" className="leading-7 text-sm text-gray-600">
            Note
          </label> */}
          <Textarea
            {...register("body", {
              maxLength: 450,
            })}
            className="border"
            placeholder="Content"
          />
          {errors.body && <p>{`Character limit is 450 (${getValues().body.length})`}</p>}
        </div>
        <Stack>
          <label htmlFor="toDo" className="pb-6 flex items-center">
            <P>Task</P>
            <Checkbox {...register("isToDo")} />
          </label>
          {!!watch("isToDo") && (
            <label htmlFor="checked" className="pb-6 flex items-center">
              <P>Complete</P>
              <Checkbox {...register("checked")} />
            </label>
          )}
        </Stack>

        <Stack gap={6} align="center" justify="space-between" className="w-full">
          <Button
            size="small"
            intent="secondary"
            onClick={() => setPage(watch("isToDo") ? "tasks" : "notes")}
          >
            Back
          </Button>
          <Stack gap={6} align="center">
            {noteId && (
              <Button size="small" onClick={onDeleteNote} intent="danger">
                Delete
              </Button>
            )}
            <Button type="submit">
              <P>{isEdit ? "Save" : "Add +"}</P>
            </Button>
          </Stack>
        </Stack>
      </div>
    </form>
  );
};

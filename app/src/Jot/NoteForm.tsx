import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Page } from "../App";
import { Button, Checkbox, Input, Textarea } from "../Components";
import { Stack } from "../Components/Stack";
import { P } from "../Components/Typography";
import { useAuth } from "../Global/Auth";
import { useGlobalDispatch } from "../Global/GlobalContext";
import { useGetNote, useNotes } from "../Global/NoteContext";
import { useApi } from "../Utils/useApi";

type NoteFormValues = {
  id: string;
  heading: string;
  body: string;
  isToDo: boolean;
  checked: boolean;
};

type NoteFormInitialValues = {
  id?: string;
  heading?: string;
  body?: string;
  isToDo?: boolean;
  checked?: boolean;
};

export const NoteForm = ({ id, isInitiallyToDo }: { id?: string; isInitiallyToDo?: boolean }) => {
  const note = useGetNote(id);
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

  return (
    <Form
      noteId={id}
      initialValues={{
        isToDo: isInitiallyToDo,
      }}
    />
  );
};

const Form = ({
  initialValues,
  noteId,
}: {
  initialValues?: NoteFormInitialValues;
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
      const endpoint = `/notes${noteId ? "/" + noteId : ""}`;

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
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <Stack className="w-full rounded-lg flex flex-col justify-between h-full">
        <Stack padding={"18px 18px 12px"} vertical>
          <div className="relative mb-4">
            <Input
              {...register("heading", { required: "A heading is required" })}
              placeholder="Title.."
            />
            {errors.heading && <p>{errors.heading.message}</p>}
          </div>
          <div className="relative">
            <Textarea
              {...register("body", {
                maxLength: 450,
              })}
              placeholder="Content.."
              canResize
            />
            {errors.body && <p>{`Character limit is 450 (${getValues().body.length})`}</p>}
          </div>
          <Stack className="items-center" gap={12}>
            <Checkbox {...register("isToDo")} label="Task" />
            {!!watch("isToDo") && <Checkbox {...register("checked")} label={"Checked"} />}
          </Stack>
        </Stack>
        <Stack
          gap={6}
          padding={18}
          align="center"
          justify="space-between"
          className="w-full border-t"
        >
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
              <P>{isEdit ? "Save" : "Add"}</P>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

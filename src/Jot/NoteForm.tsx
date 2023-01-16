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
      />
    );
  }
  return <Form />;
};

const Form = ({ initialValues }: { initialValues?: NoteFormValues }) => {
  const dispatch = useGlobalDispatch();
  const setPage = useCallback((page: Page) => dispatch({ type: "setPage", page }), [dispatch]);
  const { refetchNotes } = useNotes();

  const api = useApi();
  const { me } = useAuth();
  const userId = me?.id;

  const isEdit = useMemo(() => !!initialValues?.id, [initialValues?.id]);

  const onSubmit = useCallback(
    async (values: NoteFormValues) => {
      await api
        .post("/notes", {
          userId,
          heading: values.heading,
          content: values.body,
          todoitem: values.isToDo,
          checked: values.checked,
        })
        .then(async (res) => {
          await refetchNotes();
          setPage(values.isToDo ? "tasks" : "notes");
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    [api, refetchNotes, setPage, userId]
  );

  const onDeleteNote = useCallback(async () => {
    if (initialValues?.id) {
      await api.delete(`notes/${initialValues.id}`);
    }
  }, [api, initialValues?.id]);

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
    <section className="text-gray-600 bg-white border-2 body-font w-1/2 max-h-3/4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full  rounded-lg p-8 flex flex-col ">
          <div className="flex justify-between">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Jotter</h2>
            <Stack gap={6}>
              <Button onClick={onDeleteNote}>Delete 🗑</Button>
              <Button
                size="small"
                intent="secondary"
                onClick={() => setPage(watch("isToDo") ? "tasks" : "notes")}
              >
                Close
              </Button>
            </Stack>
          </div>
          <div className="relative mb-4">
            <label htmlFor="heading" className="leading-7 text-sm text-gray-600">
              <P>Header:</P>
            </label>
            <Input
              className="border"
              {...register("heading", { required: "A heading is required" })}
              placeholder="Dinner idea"
            />
            {errors.heading && <p>{errors.heading.message}</p>}
          </div>
          <div className="relative mb-4">
            <label htmlFor="note" className="leading-7 text-sm text-gray-600">
              Note
            </label>
            <Textarea
              {...register("body", {
                maxLength: 450,
              })}
              className="border"
              placeholder="I will need..."
            />
            {errors.body && <p>{`Character limit is 450 (${getValues().body.length})`}</p>}
          </div>
          <label htmlFor="toDo" className="pb-6 flex items-center gap-3">
            <P>Is todo:</P>
            <Checkbox {...register("isToDo")} />
          </label>
          {!!watch("isToDo") && (
            <label htmlFor="checked" className="pb-6 flex items-center gap-3">
              <P>Checked:</P>
              <Checkbox {...register("checked")} />
            </label>
          )}
          <Button type="submit" fullWidth={true}>
            <P>{isEdit ? "Save" : "Add +"}</P>
          </Button>
        </div>
      </form>
    </section>
  );
};

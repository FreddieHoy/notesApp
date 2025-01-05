import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "../Components";
import { Stack } from "../Components/Stack";
import { P } from "../Components/Typography";
import { useAuth } from "../Global/Auth";
import { useGlobalDispatch } from "../Global/GlobalContext";
import { useApi } from "../Utils/useApi";
import { useCreateNote, useGetNote, useUpdateNote } from "../client";
import { INote } from "../types";

type NoteFormValues = {
  id: string;
  heading: string;
  body: string;
};

export const NoteForm = ({ id }: { id?: string }) => {
  const { data: note, isLoading, error } = useGetNote(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting note</div>;

  return <Form noteId={id} note={note} />;
};

const Form = ({ note, noteId }: { note?: INote; noteId: string | undefined }) => {
  const dispatch = useGlobalDispatch();
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: createNote } = useCreateNote();
  const { account } = useAuth();

  const api = useApi();
  const isEdit = note?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<NoteFormValues>({
    defaultValues: {
      body: note?.content,
      heading: note?.heading,
    },
  });

  const onSubmit = async (values: NoteFormValues) => {
    if (note && account) {
      updateNote(
        {
          id: note?.id,
          heading: values.heading,
          content: values.body,
          accountId: account.id,
        },
        {
          onSuccess: () => {
            dispatch({ type: "setPage", page: "notes" });
          },
        }
      );
    } else {
      createNote({
        heading: values.heading,
        content: values.body,
      });
    }
  };

  const onDeleteNote = useCallback(async () => {
    if (note?.id) {
      await api.delete(`notes/${note.id}`).then(async (res) => {
        dispatch({ type: "setPage", page: "notes" });
      });
    }
  }, [api, note?.id, dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="w-full flex rounded-lg flex-col h-full border-l">
        <div className="p-4 flex flex-col gap-4">
          {note ? <div>Editing note: {note.heading}</div> : <div>Add a new note</div>}

          <div className="relative">
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
        </div>
        <Stack
          gap={6}
          padding={18}
          align="center"
          justify="space-between"
          className="w-full border-y"
        >
          <Button
            size="small"
            intent="secondary"
            onClick={() => dispatch({ type: "setPage", page: "notes" })}
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
      </div>
    </form>
  );
};

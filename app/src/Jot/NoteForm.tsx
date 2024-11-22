import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "../Components";
import { Stack } from "../Components/Stack";
import { P } from "../Components/Typography";
import { useAuth } from "../Global/Auth";
import { useGlobalDispatch } from "../Global/GlobalContext";
import { useApi } from "../Utils/useApi";
import { useGetNote } from "../client";

type NoteFormValues = {
  id: string;
  heading: string;
  body: string;
};

type NoteFormInitialValues = {
  id?: string;
  heading?: string;
  body?: string;
};

export const NoteForm = ({ id, isInitiallyToDo }: { id?: string; isInitiallyToDo?: boolean }) => {
  const { data: note, isLoading, error } = useGetNote(id);

  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Error getting note</div>;

  return <Form noteId={id} initialValues={{}} />;
};

const Form = ({
  initialValues,
  noteId,
}: {
  initialValues?: NoteFormInitialValues;
  noteId: string | undefined;
}) => {
  const dispatch = useGlobalDispatch();

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
      };

      const request = noteId ? api.put(endpoint, vars) : api.post(endpoint, vars);

      Promise.resolve(request)
        .then(async (res) => {
          dispatch({ type: "setPage", page: "notes" });
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    [api, dispatch, noteId, userId]
  );

  const onDeleteNote = useCallback(async () => {
    if (initialValues?.id) {
      await api.delete(`notes/${initialValues.id}`).then(async (res) => {
        dispatch({ type: "setPage", page: "notes" });
      });
    }
  }, [api, initialValues?.id, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<NoteFormValues>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <Stack className="w-full rounded-lg flex flex-col justify-between h-full">
        <Stack padding={"18px 18px 12px"} vertical>
          <div>Editing note: {initialValues?.heading}</div>

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
      </Stack>
    </form>
  );
};

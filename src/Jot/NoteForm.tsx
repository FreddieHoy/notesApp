import { useForm } from "react-hook-form";
import { Page } from "../App";
import { useAuth } from "../Auth";
import { Button, Checkbox, Input, Textarea } from "../Components";
import { P } from "../Components/Typography";
import { useApi } from "../useApi";
import { useGlobalDispatch } from "../Utils/GlobalContext";
import { useGetNote } from "../Utils/NoteContext";

type NoteFormValues = {
  id: string;
  heading: string;
  body: string;
  isToDo: boolean;
  checked: boolean;
};

export const NoteForm = ({ id }: { id?: string }) => {
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
      />
    );
  }
  return <Form />;
};

const Form = ({ initialValues }: { initialValues?: NoteFormValues }) => {
  const dispatch = useGlobalDispatch();
  const setPage = (page: Page) => dispatch({ type: "setPage", page });

  const api = useApi();
  const { me } = useAuth();
  const userId = me?.id;

  const onSubmit = async (values: NoteFormValues) => {
    console.log("submit values", values);
    await api
      .post("/notes", {
        userId,
        heading: values.heading,
        content: values.body,
        todoitem: values.isToDo,
        checked: values.checked,
      })
      .then(async (res) => {
        // await refetchNotes();
        // onClose();
        setPage("tasks");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NoteFormValues>({
    defaultValues: {
      ...initialValues,
      // heading: "",
      // body: "",
      // isToDo: false,
      // checked: false,
    },
  });

  console.log("heading ", watch("heading"));
  console.log("errors", errors);

  return (
    <section className="text-gray-600 body-font w-full h-full ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full  rounded-lg p-8 flex flex-col ">
          <div className="flex justify-between">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Jotter</h2>
            <Button size="small" intent="secondary" onClick={() => setPage("tasks")}>
              Close
            </Button>
          </div>
          <div className="relative mb-4">
            <label htmlFor="heading" className="leading-7 text-sm text-gray-600">
              <P>Header:</P>
            </label>
            <Input className="border" {...register("heading")} placeholder="Dinner idea" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="note" className="leading-7 text-sm text-gray-600">
              Note
            </label>
            <Textarea {...register("body")} className="border" placeholder="I will need..." />
          </div>
          <label htmlFor="toDo" className="pb-6 flex items-center gap-3">
            <P>Is a TODO item:</P>
            <Checkbox {...register("isToDo")} />
          </label>
          <label htmlFor="checked" className="pb-6 flex items-center gap-3">
            <P>Checked:</P>
            <Checkbox {...register("checked")} />
          </label>
          <Button type="submit" fullWidth={true}>
            <P>Add +</P>
          </Button>
        </div>
      </form>
    </section>
  );
};

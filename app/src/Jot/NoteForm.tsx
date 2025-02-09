import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { queryClient } from '../App';
import { QueryKeys, useCreateNote, useDeleteNote, useGetNote, useUpdateNote } from '../client';
import { Button, Dialog, Input, Textarea } from '../Components';
import { Stack } from '../Components/Stack';
import { useAuth } from '../Global/Auth';
import { useGlobalDispatch } from '../Global/GlobalContext';
import { INote } from '../types';
import { useIsMobile } from '../Utils/IsMobile';

type NoteFormValues = {
  id: string;
  heading: string;
  body: string;
};

export const NoteForm = ({
  id,
  disableCloseClickOutside,
}: {
  id?: string;
  disableCloseClickOutside?: boolean;
}) => {
  const { data: note, isLoading, error } = useGetNote(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error getting note</div>;

  return <Form noteId={id} note={note} disableCloseClickOutside={!!disableCloseClickOutside} />;
};

const Form = ({
  note,
  noteId,
  disableCloseClickOutside,
}: {
  note?: INote;
  noteId: string | undefined;
  disableCloseClickOutside: boolean;
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const dispatch = useGlobalDispatch();
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: createNote } = useCreateNote();
  const { mutate: deleteNote } = useDeleteNote();

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const { account } = useAuth();

  const isEdit = note?.id;

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
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
            dispatch({ type: 'setPage', page: 'notes' });
            queryClient.invalidateQueries([QueryKeys.GET_NOTE, note.id]);
            queryClient.invalidateQueries([QueryKeys.GET_All_NOTES]);
          },
        },
      );
    } else {
      createNote(
        {
          heading: values.heading,
          content: values.body,
        },
        {
          onSuccess: () => {
            dispatch({ type: 'setPage', page: 'notes' });
            queryClient.invalidateQueries([QueryKeys.GET_All_NOTES]);
          },
        },
      );
    }
  };

  const onDeleteNote = () => {
    if (note?.id) {
      deleteNote(note.id, {
        onSuccess: () => {
          dispatch({ type: 'setPage', page: 'notes' });
          queryClient.invalidateQueries([QueryKeys.GET_All_NOTES]);
        },
      });
    }
  };

  /**
   Click outside logic
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (disableCloseClickOutside || deleteModal || isMobile) return;
      if (!targetRef?.current?.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
        dispatch({ type: 'setPage', page: 'notes' });
      }
    };
    document.addEventListener('click', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('click', handleClickOutside, {
        capture: true,
      });
    };
  }, [deleteModal, disableCloseClickOutside, dispatch, isMobile, targetRef]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <div
          ref={targetRef}
          className="flex h-full w-full flex-col rounded-lg border-l dark:border-gray-700"
        >
          <div className="flex flex-col gap-4 p-4">
            {note ? (
              <span className="dark:text-gray-200">
                Editing: <span className="font-semibold">{note.heading}</span>
              </span>
            ) : (
              <span className="dark:text-gray-200">Create Note</span>
            )}

            <div className="relative">
              <Input
                {...register('heading', { required: 'A heading is required' })}
                placeholder="Title.."
                error={errors.heading?.message}
                touched={touchedFields.heading}
              />
            </div>
            <div className="relative">
              <Textarea
                {...register('body', {
                  maxLength: 450,
                })}
                placeholder="Content.."
                canResize
                className="h-[350px] sm:h-[200px]"
              />
              {errors.body && <p>{`Character limit is 450 (${getValues().body.length})`}</p>}
            </div>
          </div>
          <Stack
            gap={6}
            padding={18}
            align="center"
            justify="space-between"
            className="w-full border-t dark:border-gray-700"
          >
            <Button
              size="small"
              intent="secondary"
              onClick={() => dispatch({ type: 'setPage', page: 'notes' })}
            >
              Close
            </Button>
            <div className="flex items-center gap-4">
              {noteId && (
                <Button size="small" onClick={() => setDeleteModal(true)} intent="danger">
                  Delete
                </Button>
              )}
              <Button type="submit">{isEdit ? 'Save' : 'Add'}</Button>
            </div>
          </Stack>
        </div>
      </form>
      <Dialog
        isOpen={!!deleteModal}
        onClose={() => setDeleteModal(false)}
        title={`Delete ${note?.heading}`}
      >
        <p>Are you sure you want to delete this note?</p>
        <div className="flex gap-4">
          <Button onClick={onDeleteNote}>Delete</Button>
        </div>
      </Dialog>
    </>
  );
};

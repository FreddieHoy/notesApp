import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { queryClient } from '../App';
import { Button, Input, Textarea } from '../Components';
import { Stack } from '../Components/Stack';
import { P } from '../Components/Typography';
import { useAuth } from '../Global/Auth';
import { useGlobalDispatch } from '../Global/GlobalContext';
import { useApi } from '../Utils/useApi';
import { QueryKeys, useCreateNote, useGetNote, useUpdateNote } from '../client';
import { INote } from '../types';

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
  const targetRef = useRef<HTMLDivElement>(null);
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
            dispatch({ type: 'setPage', page: 'notes' });
            queryClient.invalidateQueries([QueryKeys.GET_NOTE, note.id]);
            queryClient.invalidateQueries([QueryKeys.GET_All_NOTES]);
          },
        },
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
        dispatch({ type: 'setPage', page: 'notes' });
      });
    }
  }, [api, note?.id, dispatch]);

  /**
   Click outside logic
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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
  }, [dispatch, targetRef]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div ref={targetRef} className="flex h-full w-full flex-col rounded-lg border-l">
        <div className="flex flex-col gap-4 p-4">
          {note ? (
            <span>
              Editing: <span className="font-semibold">{note.heading}</span>
            </span>
          ) : (
            <span>Add a new note</span>
          )}

          <div className="relative">
            <Input
              {...register('heading', { required: 'A heading is required' })}
              placeholder="Title.."
            />
            {errors.heading && <p>{errors.heading.message}</p>}
          </div>
          <div className="relative">
            <Textarea
              {...register('body', {
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
            onClick={() => dispatch({ type: 'setPage', page: 'notes' })}
          >
            Close
          </Button>
          <Stack gap={6} align="center">
            {noteId && (
              <Button size="small" onClick={onDeleteNote} intent="danger">
                Delete
              </Button>
            )}
            <Button type="submit">
              <P>{isEdit ? 'Save' : 'Add'}</P>
            </Button>
          </Stack>
        </Stack>
      </div>
    </form>
  );
};

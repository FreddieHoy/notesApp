import { useState } from 'react';
import { useGlobalDispatch } from '../Global/GlobalContext';
import { INote } from '../types';
import { Stack } from './Stack';
import { H3, P } from './Typography';

export const Card = ({ note }: { note: INote }) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  const dispatch = useGlobalDispatch();

  return (
    <div
      className={
        'duration-400 w-fit min-w-[400px] overflow-hidden rounded-md border border-gray-300 bg-white p-4 transition-all hover:cursor-pointer hover:shadow dark:border-gray-600 dark:bg-gray-800'
      }
      onClick={() => dispatch({ type: 'setPage', page: 'note', noteId: note.id })}
    >
      <Stack
        vertical
        gap={6}
        grow
        className="relative overflow-hidden"
        ref={(overflowRef) => {
          if (overflowRef) {
            setHasOverflow(overflowRef.scrollHeight > overflowRef.clientHeight);
          }
        }}
      >
        <Stack gap={6} justify="space-between">
          <H3 className={'overflow-hidden overflow-ellipsis whitespace-nowrap'}>{note.heading}</H3>
        </Stack>
        <P className="flex grow whitespace-pre-line">
          {note.content || <span className="italic text-gray-400">Add content..</span>}
        </P>
      </Stack>
      {hasOverflow && (
        <P intent="placeholder" className="right-10 top-10">
          See more..
        </P>
      )}
    </div>
  );
};

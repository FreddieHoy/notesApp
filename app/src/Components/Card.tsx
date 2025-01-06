import cn from 'classnames';
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
      className={cn(
        'relative w-full overflow-hidden rounded-md border border-gray-300 bg-white p-4 transition-all',
        'duration-200 hover:cursor-pointer hover:shadow-md active:shadow-none',
        'dark:border-gray-600 dark:bg-gray-800',
        'mb-3 break-inside-avoid',
      )}
      onClick={() => dispatch({ type: 'setPage', page: 'note', noteId: note.id })}
    >
      <div
        className="relative flex max-h-[336px] flex-grow flex-col gap-2 overflow-hidden"
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
      </div>
      {hasOverflow && (
        <div className="absolute bottom-1 right-4">
          <P intent="placeholder">..click to see more</P>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { useGlobalDispatch } from "../Global/GlobalContext";
import { INote } from "../types";
import { Stack } from "./Stack";
import { H3, P } from "./Typography";

export const Card = ({ note }: { note: INote }) => {
  const [hasOverflow, setHasOverflow] = useState(false);
  const dispatch = useGlobalDispatch();

  return (
    <div
      className={
        "p-4 min-w-[400px] w-fit bg-gray-50 dark:bg-gray-800 rounded-md hover:cursor-pointer hover:shadow border border-gray-300 dark:border-gray-600 transition-all duration-400 overflow-hidden"
      }
      onClick={() => dispatch({ type: "setPage", page: "note", noteId: note.id })}
    >
      <Stack
        vertical
        gap={6}
        grow
        className="overflow-hidden relative"
        ref={(overflowRef) => {
          if (overflowRef) {
            setHasOverflow(overflowRef.scrollHeight > overflowRef.clientHeight);
          }
        }}
      >
        <Stack gap={6} justify="space-between">
          <H3 className={"overflow-ellipsis whitespace-nowrap overflow-hidden"}>{note.heading}</H3>
        </Stack>
        <P className="whitespace-pre-line flex grow">
          {note.content || <span className="italic text-gray-400">Add content..</span>}
        </P>
      </Stack>
      {hasOverflow && (
        <P intent="placeholder" className="top-10 right-10 ">
          See more..
        </P>
      )}
    </div>
  );
};

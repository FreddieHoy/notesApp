import { Note } from "./Home";

export const Body = ({ notes }: { notes: Note[] }) => {
  return (
    <div
      className={
        "flex flex-grow flex-wrap gap-4  w-full box-border overflow-hidden "
      }
    >
      {notes.map((note) => {
        return (
          <div
            key={note.id}
            className={"max-w-sm min-w-min bg-cyan-100 rounded-md p-3 max-h-40"}
          >
            <h2>
              {note.heading}
              {` (${note.id})`}
            </h2>
            <p>{note.content}</p>
          </div>
        );
      })}
    </div>
  );
};

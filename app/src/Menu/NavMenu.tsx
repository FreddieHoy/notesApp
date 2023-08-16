import { Page } from "../App";
import { NavButton } from "../Components/NavButton";
import { Stack } from "../Components/Stack";
import { H1, H3 } from "../Components/Typography";
import { useGlobal, useGlobalDispatch } from "../Global/GlobalContext";

import {
  PlusIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export const NavMenu = () => {
  const { page, noteState } = useGlobal();
  const dispatch = useGlobalDispatch();
  const setPage = (page: Page) => dispatch({ type: "setPage", page });

  return (
    <Stack className="bg-gray-100 dark:bg-gray-900 min-w-[220px] pr-5" vertical gap={12}>
      <Stack padding={"12px 24px"}>
        <H1 underline="primary">Jotter</H1>
      </Stack>
      <NavButton onClick={() => setPage("tasks")} active={page === "tasks"}>
        <RectangleStackIcon className="h-6 w-6 dark:text-gray-300" />
        <H3>Tasks</H3>
      </NavButton>
      <NavButton onClick={() => setPage("notes")} active={page === "notes"}>
        <PencilSquareIcon className="h-6 w-6 dark:text-gray-300" />
        <H3>Notes</H3>
      </NavButton>
      <NavButton
        type="button"
        onClick={() => dispatch({ type: "openNote" })}
        disabled={noteState.visible}
      >
        <PlusIcon className="h-6 w-6 dark:text-gray-300" />
        <H3>Add</H3>
      </NavButton>
      <NavButton onClick={() => setPage("profile")} active={page === "profile"}>
        <UserIcon className="h-6 w-6 dark:text-gray-300" />
        <H3>Profile</H3>
      </NavButton>
    </Stack>
  );
};

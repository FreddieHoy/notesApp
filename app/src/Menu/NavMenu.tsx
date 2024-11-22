import { PencilSquareIcon, PlusIcon, UserIcon } from "@heroicons/react/24/solid";

import { NavButton } from "../Components/NavButton";
import { Stack } from "../Components/Stack";
import { H1, H3 } from "../Components/Typography";
import { PageState, useGlobal, useGlobalDispatch } from "../Global/GlobalContext";

export const NavMenu = () => {
  const { pageState } = useGlobal();
  const dispatch = useGlobalDispatch();
  const setPage = (pageState: PageState) => dispatch({ type: "setPage", page: pageState.page });

  return (
    <Stack className="bg-gray-100 dark:bg-gray-900 min-w-[220px] pr-5" vertical gap={12}>
      <Stack padding={"12px 24px"}>
        <H1 underline="primary">Jotter</H1>
      </Stack>

      <NavButton
        onClick={() => setPage({ page: "notes" })}
        active={pageState.page === "notes" || pageState.page === "note"}
      >
        <PencilSquareIcon className="h-6 w-6 dark:text-gray-300" />
        <H3>Notes</H3>
      </NavButton>
      <NavButton type="button" onClick={() => dispatch({ type: "setPage", page: "note" })}>
        <PlusIcon className="h-6 w-6 dark:text-gray-300" />
        <H3>Add</H3>
      </NavButton>
      <NavButton onClick={() => setPage({ page: "profile" })} active={pageState.page === "profile"}>
        <UserIcon className="h-6 w-6 dark:text-gray-300" />
        <H3>Profile</H3>
      </NavButton>
    </Stack>
  );
};

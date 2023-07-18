import { Page } from "../App";
import { NavButton } from "../Components/NavButton";
import { Stack } from "../Components/Stack";
import { H1, H2 } from "../Components/Typography";
import { useGlobal, useGlobalDispatch } from "../Utils/GlobalContext";

export const NavMenu = () => {
  const { page, noteState } = useGlobal();
  const dispatch = useGlobalDispatch();
  const setPage = (page: Page) => dispatch({ type: "setPage", page });

  return (
    <Stack className="bg-gray-100 min-w-[220px] pr-5" vertical gap={12}>
      <Stack padding={"12px 24px"}>
        <H1 underline="primary">Jotter</H1>
      </Stack>
      <NavButton onClick={() => setPage("tasks")} active={page === "tasks"}>
        <H2>Tasks</H2>
      </NavButton>
      <NavButton onClick={() => setPage("notes")} active={page === "notes"}>
        <H2>Notes</H2>
      </NavButton>
      <NavButton
        type="button"
        onClick={() => dispatch({ type: "openNote" })}
        disabled={noteState.visible}
      >
        <H2>Add +</H2>
      </NavButton>
      <NavButton onClick={() => setPage("profile")} active={page === "profile"}>
        <H2>Profile</H2>
      </NavButton>
    </Stack>
  );
};

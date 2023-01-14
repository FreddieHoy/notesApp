import { Page } from "../App";
import { Button } from "../Components";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { useGlobal, useGlobalDispatch } from "../Utils/GlobalContext";

export const MobileFooterMenu = () => {
  const { page, noteState } = useGlobal();
  const dispatch = useGlobalDispatch();
  const setPage = (page: Page) => dispatch({ type: "setPage", page });
  return (
    <Stack
      className="w-full border-t-2 border-grey-600"
      justify="space-around"
      align="center"
      padding={"12px 0px"}
    >
      <Button intent="minimal" onClick={() => setPage("tasks")} active={page === "tasks"}>
        <H2>Tasks</H2>
      </Button>
      <Button intent="minimal" onClick={() => setPage("notes")} active={page === "notes"}>
        <H2>Notes</H2>
      </Button>
      <Button
        intent="minimal"
        type="button"
        size="small"
        onClick={() => dispatch({ type: "openNote" })}
        disabled={noteState.visable}
      >
        <H2>Add +</H2>
      </Button>
      <Button intent="minimal" onClick={() => setPage("profile")} active={page === "profile"}>
        <H2>Profile</H2>
      </Button>
    </Stack>
  );
};

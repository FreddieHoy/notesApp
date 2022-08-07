import { Page } from "../App";
import { Button } from "../Components";
import { Stack } from "../Components/Stack";
import { H1 } from "../Components/Typography";

export const MobileFooter = ({ setPage, page }: { page: Page; setPage: (val: Page) => void }) => {
  return (
    <Stack
      className="w-full border-t-2 border-grey-600"
      justify="space-around"
      align="center"
      padding={"12px 0px"}
    >
      <Button intent="minimal" onClick={() => setPage("tasks")} active={page === "tasks"}>
        <H1>Tasks</H1>
      </Button>
      <Button intent="minimal" onClick={() => setPage("notes")} active={page === "notes"}>
        <H1>Notes</H1>
      </Button>
      <Button intent="minimal" onClick={() => setPage("profile")} active={page === "profile"}>
        <H1>Profile</H1>
      </Button>
      <Button
        intent="minimal"
        type="button"
        size="small"
        onClick={() => setPage("note")}
        disabled={page === "note"}
      >
        <H1>Add +</H1>
      </Button>
    </Stack>
  );
};

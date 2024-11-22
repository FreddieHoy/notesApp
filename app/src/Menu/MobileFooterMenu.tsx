import { Button } from "../Components";
import { Stack } from "../Components/Stack";
import { H2 } from "../Components/Typography";
import { PageState, useGlobal, useGlobalDispatch } from "../Global/GlobalContext";

export const MobileFooterMenu = () => {
  const { pageState } = useGlobal();
  const dispatch = useGlobalDispatch();
  const setPage = (pageState: PageState) => dispatch({ type: "setPage", page: pageState.page });
  return (
    <Stack
      className="w-full border-t-2 border-grey-600"
      justify="space-around"
      align="center"
      padding={"12px 0px"}
    >
      <Button
        intent="minimal"
        onClick={() => setPage({ page: "notes" })}
        active={pageState.page === "notes"}
      >
        <H2>Notes</H2>
      </Button>
      <Button
        intent="minimal"
        type="button"
        size="small"
        onClick={() => dispatch({ type: "setPage", page: "note" })}
      >
        <H2>+</H2>
      </Button>
      <Button
        intent="minimal"
        onClick={() => setPage({ page: "profile" })}
        active={pageState.page === "profile"}
      >
        <H2>Profile</H2>
      </Button>
    </Stack>
  );
};

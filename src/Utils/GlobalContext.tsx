import { createContext, ReactNode, useContext, useReducer } from "react";
import { match } from "ts-pattern";
import { Page } from "../App";

interface GlobalContextState {
  page: Page;
  noteState: {
    visible: boolean;
    noteId?: string;
  };
}

interface GlobalContextType {
  state: GlobalContextState;
  dispatch: (val: Msg) => void;
}

const intialState: GlobalContextState = {
  page: "profile",
  noteState: {
    visible: false,
  },
};

const defualtValue: GlobalContextType = {
  state: intialState,
  dispatch: () => {},
};

type Msg = { type: "setPage"; page: Page } | { type: "openNote"; id?: string };

const GlobalContext = createContext<GlobalContextType>(defualtValue);

const reducer = (state: GlobalContextState, msg: Msg): GlobalContextState => {
  const newState: GlobalContextState = match<Msg, GlobalContextState>(msg)
    .with({ type: "setPage" }, ({ page }) => ({
      noteState: {
        visible: false,
        noteId: undefined,
      },
      page,
    }))
    .with({ type: "openNote" }, ({ id }) => ({
      ...state,
      noteState: {
        visible: true,
        noteId: id,
      },
    }))
    .exhaustive();
  return newState;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  console.info("state", state);

  const value: GlobalContextType = {
    state,
    dispatch,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext).state;
export const useGlobalDispatch = () => useContext(GlobalContext).dispatch;
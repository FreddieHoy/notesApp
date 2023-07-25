import { createContext, ReactNode, useContext, useReducer } from "react";
import { match } from "ts-pattern";
import { Page } from "../App";

export type Theme = "light" | "dark";

interface GlobalContextState {
  page: Page;
  noteState: {
    visible: boolean;
    isInitiallyToDo?: boolean;
    noteId?: string;
  };

  theme: Theme;
}

interface GlobalContextType {
  state: GlobalContextState;
  dispatch: (val: Msg) => void;
}

const initialState: GlobalContextState = {
  page: "tasks",
  noteState: {
    visible: false,
    isInitiallyToDo: false,
  },
  theme: "light",
};

const defaultValue: GlobalContextType = {
  state: initialState,
  dispatch: () => {},
};

type Msg =
  | { type: "setPage"; page: Page }
  | { type: "openNote"; id?: string; isInitiallyToDo?: boolean }
  | { type: "setTheme"; theme: Theme };

const GlobalContext = createContext<GlobalContextType>(defaultValue);

const reducer = (state: GlobalContextState, msg: Msg): GlobalContextState => {
  console.log("state", state, msg);
  const newState: GlobalContextState = match<Msg, GlobalContextState>(msg)
    .with({ type: "setPage" }, ({ page }) => ({
      ...state,
      noteState: {
        visible: false,
        noteId: undefined,
      },
      page,
    }))
    .with({ type: "openNote" }, ({ id, isInitiallyToDo }) => {
      console.log("heree", isInitiallyToDo);
      return {
        ...state,
        noteState: {
          noteId: id,
          isInitiallyToDo,
          visible: true,
        },
      };
    })
    .with({ type: "setTheme" }, ({ theme }) => ({
      ...state,
      theme,
    }))
    .exhaustive();
  return newState;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: GlobalContextType = {
    state,
    dispatch,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => useContext(GlobalContext).state;
export const useGlobalDispatch = () => useContext(GlobalContext).dispatch;

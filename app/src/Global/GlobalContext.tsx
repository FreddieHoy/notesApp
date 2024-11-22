import { createContext, ReactNode, useContext, useReducer } from "react";
import { match } from "ts-pattern";

export type Theme = "light" | "dark";
export type PageType = "note" | "notes" | "profile";

export type PageState = { page: "note"; noteId?: string } | { page: "notes" } | { page: "profile" };

interface GlobalContextState {
  pageState: PageState;
  theme: Theme;
}

interface GlobalContextType {
  state: GlobalContextState;
  dispatch: (val: Msg) => void;
}

const initialState: GlobalContextState = {
  pageState: { page: "notes" },
  theme: "light",
};

const defaultValue: GlobalContextType = {
  state: initialState,
  dispatch: () => {},
};

type Msg =
  | { type: "setPage"; page: PageType; noteId?: string }
  | { type: "setTheme"; theme: Theme };

const GlobalContext = createContext<GlobalContextType>(defaultValue);

const reducer = (state: GlobalContextState, msg: Msg): GlobalContextState => {
  const newState: GlobalContextState = match<Msg, GlobalContextState>(msg)
    .with({ type: "setPage" }, ({ page, noteId }) => ({
      ...state,
      pageState: {
        page,
        noteId: page === "note" ? noteId : undefined,
      },
    }))
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

import { PlusIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { match } from 'ts-pattern';
import './App.css';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Button } from './Components';
import { H2 } from './Components/Typography';
import { AuthProvider, deleteCookies } from './Global/Auth';
import { GlobalProvider, useGlobal, useGlobalDispatch } from './Global/GlobalContext';
import { NoteForm } from './Jot/NoteForm';
import { Notes } from './Jot/Notes';
import { NavMenu } from './Menu/NavMenu';
import { Profile } from './Profile/Profile';
import { useIsMobile } from './Utils/IsMobile';
import { useGetMe, useLogout } from './client';
import { IAccount } from './types';

export const queryClient = new QueryClient();

export type LoginView = 'login' | 'register';

const Jotter = () => {
  const isMobile = useIsMobile();
  const { pageState } = useGlobal();
  const dispatch = useGlobalDispatch();

  const handleAdd = () => {
    dispatch({ type: 'setPage', page: 'note' });
  };

  const isNoteShow = pageState.page === 'note';

  return (
    <>
      <div className="relative m-0 flex h-screen w-screen overflow-hidden p-0 dark:bg-gray-800">
        <NavMenu />
        <div className="flex flex-grow flex-col">
          <div className="flex w-full items-center justify-between gap-1 border-b p-3">
            <H2>Notes</H2>
            <Button intent="secondary" size="small" onClick={handleAdd}>
              <PlusIcon className="h-6 w-6" />
            </Button>
          </div>
          <div className={cn('flex grow flex-col overflow-hidden bg-gray-50')}>
            {match({ pageState, isMobile })
              .with({ pageState: { page: 'notes' } }, { pageState: { page: 'note' } }, () => (
                <Notes />
              ))
              .with({ pageState: { page: 'profile' } }, () => <Profile />)
              .exhaustive()}
          </div>
          <div
            className={cn(
              'absolute top-0 z-10 h-full shadow-2xl transition-all duration-500',
              'flex w-[500px] min-w-[500px] grow flex-col overflow-hidden bg-gray-50',
              {
                '-right-[calc(100%)]': !isNoteShow,
                'right-0': isNoteShow,
              },
            )}
          >
            {isNoteShow && <NoteForm id={pageState.noteId} />}
          </div>
        </div>
      </div>
    </>
  );
};

const Providers = ({ user, logout }: { user: IAccount; logout: () => void }) => {
  return (
    <AuthProvider account={user} logout={logout}>
      <GlobalProvider>
        <Jotter />
      </GlobalProvider>
    </AuthProvider>
  );
};

const App = () => {
  const [user, setUser] = useState<IAccount | undefined>(undefined);

  const { isLoading } = useGetMe({
    onSuccess: (user) => setUser(user),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: logout } = useLogout();

  const onLogout = () => {
    setUser(undefined);
    try {
      logout();
    } catch (e) {
      deleteCookies();
    }
    localStorage.clear();
  };

  const [view, setView] = useState<LoginView>('login');

  if (isLoading && !user) return <>Load4ing....</>;

  if (user?.id) return <Providers user={user} logout={onLogout} />;

  return match(view)
    .with('login', () => <Login setView={setView} setUser={setUser} />)
    .with('register', () => <Register setView={setView} />)
    .exhaustive();
};

export const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

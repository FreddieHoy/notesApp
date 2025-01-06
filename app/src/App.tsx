import cn from 'classnames';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { match } from 'ts-pattern';
import './App.css';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { Header } from './Components/Header';
import { AuthProvider, deleteCookies } from './Global/Auth';
import { GlobalProvider, useGlobal } from './Global/GlobalContext';
import { NoteForm } from './Jot/NoteForm';
import { Notes } from './Jot/Notes';
import { MobileFooterMenu } from './Menu/MobileFooterMenu';
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

  const isNoteShow = pageState.page === 'note';

  return (
    <div className="relative m-0 flex h-screen w-screen overflow-hidden bg-gray-100 p-0 dark:bg-gray-800">
      <NavMenu />
      <div className="flex flex-grow flex-col overflow-y-scroll">
        <Header />
        <div className={cn('flex flex-col')}>
          {match({ pageState, isMobile })
            .with({ pageState: { page: 'notes' } }, () => <Notes />)
            .with({ pageState: { page: 'note' } }, () => (
              <>
                <div className="hidden sm:block">
                  <Notes />
                </div>
                <div className="sm:hidden">
                  {isNoteShow && <NoteForm id={pageState.noteId} disableCloseClickOutside />}
                </div>
              </>
            ))
            .with({ pageState: { page: 'profile' } }, () => <Profile />)
            .exhaustive()}
        </div>
        {/* Peeking window */}
        <div
          className={cn(
            'absolute top-0 z-10 h-full bg-gray-50 shadow-xl transition-all duration-500 dark:bg-gray-800',
            'hidden w-[500px] min-w-[500px] grow flex-col sm:flex',
            {
              '-right-[calc(100%)]': !isNoteShow,
              'right-0': isNoteShow,
            },
          )}
        >
          {isNoteShow && <NoteForm id={pageState.noteId} />}
        </div>
      </div>
      <MobileFooterMenu />
    </div>
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

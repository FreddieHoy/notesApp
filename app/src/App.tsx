import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { match } from 'ts-pattern';
import './App.css';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import { AuthProvider, deleteCookies } from './Global/Auth';
import { GlobalProvider } from './Global/GlobalContext';
import { Jotter } from './Jotter';
import { useGetMe, useLogout } from './client';
import { IAccount } from './types';

export const queryClient = new QueryClient();

export type LoginView = 'login' | 'register';

const Providers = ({
  user,
  logout,
  isLoadingLogout,
}: {
  user: IAccount;
  logout: () => void;
  isLoadingLogout: boolean;
}) => {
  return (
    <AuthProvider account={user} logout={logout} isLoadingLogout={isLoadingLogout}>
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

  const { mutate: logout, isLoading: isLoadingLogout } = useLogout();

  const onLogout = () => {
    try {
      logout(undefined, {
        onSuccess: () => {
          localStorage.clear();
          deleteCookies();
          setUser(undefined);
        },
      });
    } catch (e) {
      localStorage.clear();
      deleteCookies();
      setUser(undefined);
    }
  };

  const [view, setView] = useState<LoginView>('login');

  if (isLoading && !user) return <>Load4ing....</>;

  if (user?.id)
    return <Providers user={user} logout={onLogout} isLoadingLogout={isLoadingLogout} />;

  return (
    <div className="box-border flex h-screen w-screen items-center justify-center">
      <section className="body-font text-gray-600">
        <div className="flex items-center gap-8 px-5">
          <div className="flex flex-col pr-6">
            <h1 className="title-font text-lg font-medium text-gray-900">Welcome to Jotter</h1>
            <p className="mt-4 leading-relaxed">The greatest note taking app on the planet</p>
          </div>
          <div className="flex min-w-[400px] flex-col rounded-lg bg-gray-100 p-8 py-4">
            {match(view)
              .with('login', () => <Login setView={setView} setUser={setUser} />)
              .with('register', () => <Register setView={setView} />)
              .exhaustive()}
          </div>
        </div>
      </section>
    </div>
  );
};

export const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { match } from 'ts-pattern';
import { Login } from './Auth/Login';
import { Register } from './Auth/Register';
import './Global.css';
import { AuthProvider, deleteCookies, getUserCookie } from './Global/Auth';
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

  useEffect(() => {
    const userCookie = getUserCookie();
    if (!user && userCookie) setUser(userCookie);
  }, [user]);

  const { isLoading } = useGetMe({
    onSuccess: (user) => setUser(user),
    onError: () => {
      deleteCookies();
      setUser(undefined);
    },
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: !!user,
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

  if (isLoading && !user)
    return (
      <div className="box-border flex h-screen w-screen items-center justify-center">
        Load4ing....
      </div>
    );

  if (user?.id)
    return <Providers user={user} logout={onLogout} isLoadingLogout={isLoadingLogout} />;

  return (
    <div className="box-border flex h-screen w-screen items-center justify-center">
      <section className="body-font text-gray-600">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:px-5">
          <div className="flex flex-col pr-6">
            <h1 className="title-font text-lg font-medium text-gray-900">Welcome to Jotter</h1>
            <p className="mt-4 leading-relaxed">The greatest note taking app on the planet</p>
          </div>
          <div className="flex w-full flex-col rounded-lg bg-gray-100 p-6 sm:w-auto sm:min-w-[400px] sm:p-8">
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

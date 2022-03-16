import { useAuth } from "../Auth";
import { Button } from "../Components/Button";

export const Jot = () => {
  const { logout } = useAuth();

  return (
    <div className={"flex h-screen w-screen justify-center items-center"}>
      <div>Home! Welcome back Jotter</div>
      <Button type="button" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

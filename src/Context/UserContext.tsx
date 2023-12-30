import { TOKEN_NAME } from "@/Constants";
import { TContextValue, TUser } from "@/Interfaces";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthProvider = createContext<TContextValue | undefined>(undefined);

const UserContext = ({
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}) => {
  const [cookies] = useCookies([TOKEN_NAME.FLOW_TASK_ACCESS_TOKEN]);

  const token = cookies?.flowTaskAccessToken;
  const [User, setUser] = useState<TUser | null>(null);
  // console.log(User);
  const userFromLocalStorage = localStorage.getItem("currentUser");
  useEffect(() => {
    if (token) {
      if (userFromLocalStorage) {
        setUser(JSON.parse(userFromLocalStorage));
      }
    }
    // const token = cookies.dreamHomeAccessToken;
  }, [userFromLocalStorage, token]);

  const value: TContextValue = { User, setUser };

  return (
    <AuthProvider.Provider value={value}>{children}</AuthProvider.Provider>
  );
};

export default UserContext;

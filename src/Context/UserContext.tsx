import { TContextValue, TUser } from "@/Interfaces";
import { createContext, useState } from "react";

export const AuthProvider = createContext<TContextValue | undefined>(undefined);

const UserContext = ({
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}) => {
  const [User, setUser] = useState<TUser | null>(null);

  const value: TContextValue = { User, setUser };

  return (
    <AuthProvider.Provider value={value}>{children}</AuthProvider.Provider>
  );
};

export default UserContext;

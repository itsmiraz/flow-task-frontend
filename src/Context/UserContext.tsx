import { createContext, useState, Dispatch, SetStateAction } from "react";

export interface TContextValue {
  User: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
}

export const AuthProvider = createContext<TContextValue | undefined>(undefined);

type TUser = {
  name: string;
  email: string;
};

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

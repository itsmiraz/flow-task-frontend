import { Link } from "react-router-dom";
import logo from "/Image/white-logo.png";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useContext } from "react";
import { AuthProvider } from "@/Context/UserContext";
import { TContextValue } from "@/Interfaces";
import { TOKEN_NAME } from "@/Constants";
import { useCookies } from "react-cookie";

const Header = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([
    TOKEN_NAME.FLOW_TASK_ACCESS_TOKEN,
  ]);

  const { User } = useContext(AuthProvider) as TContextValue;
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    removeCookie(TOKEN_NAME.FLOW_TASK_ACCESS_TOKEN);
  };
  return (
    <div className="mx-auto border-b border-gray-500 border-opacity-35 w-full flex justify-between items-center py-4 px-10">
      <img src={logo} className="w-24" alt="" />
      <div>
        <ul className="flex justify-center items-center gap-x-4 ">
          {User?._id ? (
            <>
              <li>
                <p className="pb-2">{User.name}</p>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      src={User?.profileImg}
                      alt="profile"
                      className="rounded-full w-8"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={handleLogout}>Log Out</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/"}>
                  <Button>Sign In</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

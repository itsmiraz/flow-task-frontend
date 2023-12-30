import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { TOKEN_NAME } from "@/Constants";

const Private = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies([TOKEN_NAME.FLOW_TASK_ACCESS_TOKEN]);

  console.log(cookies);
  const token = cookies?.flowTaskAccessToken;
  const location = useLocation();
  console.log(token);
  if (token) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default Private;

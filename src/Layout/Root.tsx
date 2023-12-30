import { Outlet } from "react-router-dom";
function Root() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Outlet />
    </div>
  );
}

export default Root;

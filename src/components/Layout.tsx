import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="p-8">
      <Header />
      <Outlet />
    </div>
  );
};

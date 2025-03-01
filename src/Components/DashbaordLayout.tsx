import React from "react";
import { Outlet } from "react-router";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-200 font-roboto">
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

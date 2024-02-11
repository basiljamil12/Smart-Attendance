import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router";

function AdminDashboard() {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full"></div>
    </div>
  );
}

export default AdminDashboard;

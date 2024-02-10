import Sidebar from "../../components/sidebar/sidebar";

function AdminDashboard() {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div>This is a text that can be displayed</div>
    </div>
  );
}

export default AdminDashboard;

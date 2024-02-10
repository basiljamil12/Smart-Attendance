import StudentNavbar from "../../components/navbars/student_navbar";
import Spinner from "../../components/spinner/spinner";

function StudentDashboard() {
  return (
    <div>
      <div>
        <StudentNavbar />
      </div>
      <div>
        <Spinner />
      </div>
    </div>
  );
}

export default StudentDashboard;

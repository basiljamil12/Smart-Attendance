import "../App.css";
import React, { useState, useEffect } from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import RoleSelect from "../pages/role_selection";
import StudentLogin from "../pages/student_pages/student_login";
import StudentDashboard from "../pages/student_pages/student_dashboard";
import ParentDashboard from "../pages/parent_pages/parent_dashboard";
import FacultyDashboard from "../pages/faculty_pages/faculty_dashboard";
import ParentLogin from "../pages/parent_pages/parent_login";
import FacultyLogin from "../pages/faculty_pages/faculty_login";
import AdminLogin from "../pages/admin_pages/admin_login";
import ApplyLeave from "../pages/student_pages/apply_leave";
import CreateCourse from "../pages/admin_pages/course/create_course";
import ResetPassword from "../pages/reset_pw";
import CreateParent from "../pages/admin_pages/parent/create_parent";
import FacultyAdboard from "../pages/admin_pages/faculty/admin_faculty_board";
import CreateFaculty from "../pages/admin_pages/faculty/create_faculty";
import EditFaculty from "../pages/admin_pages/faculty/edit_faculty";
import EditParent from "../pages/admin_pages/parent/edit_parent";
import EditStudent from "../pages/admin_pages/student/edit_student";
import Sidebar from "../components/sidebar/sidebar";
import StudentAttendanceDetails from "../pages/student_pages/attendance_details";
import OfferedCourses from "../pages/student_pages/offered_courses";
import CourseApproval from "../pages/faculty_pages/course_approve";
import FacultyAccountDetails from "../pages/faculty_pages/account_details";
import CreateStudent from "../pages/admin_pages/student/create_student";
import StudentAccountDetails from "../pages/student_pages/student_account_details";
import StudentAdboard from "../pages/admin_pages/student/admin_student_board";
import ParentAdboard from "../pages/admin_pages/parent/admin_parent_board";
import CourseAdboard from "../pages/admin_pages/course/admin_course_board";
import EditCourse from "../pages/admin_pages/course/edit_course";
import FacultyLeaveDashboard from "../pages/faculty_pages/leave_dashboard";
import RegisteredCourses from "../pages/student_pages/registered_courses";
import StudentLeaveDashboard from "../pages/student_pages/leave_dashboard";
import ChangePassword from "../pages/change_password";
import ParentAccountDetails from "../pages/parent_pages/parent_account_details";
import AssignCourse from "../pages/faculty_pages/assign_course";
import MarkAttendance from "../pages/faculty_pages/mark_attendnace";
import FacialRegAdboard from "../pages/admin_pages/face_registration/face_reg_dashboard";
// import FacultyDetailsManager from "../models/faculty/auth/http/getdetails";
// const facultyDetailsManager = new FacultyDetailsManager();

// const [isStudentAdvisor, setIsStudentAdvisor] = useState(false); // State to store if user is a student advisor
// const [facultyData, setFacultyData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       // setShowLoading(true);
//       try {
//         const response = await facultyDetailsManager.get();
//         if (response.success) {
//           setFacultyData(response.data);
//           setIsStudentAdvisor(response.data.isStudentAdvisor); // Update isStudentAdvisor state
//         } else {
//           // Handle error
//         }
//       } catch (error) {
//         // Handle error
//       } finally {
//         // setShowLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
function ResetPasswordRoute() {
  return <ResetPassword />;
}
function ChangePasswordRoute() {
  return <ChangePassword />;
}
function Layout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const showSidebar = [
    "/adboard/dashboard",
    "/adboard/faculty",
    "/adboard/faculty/add",
    "/adboard/faculty/edit",
    "/adboard/student",
    "/adboard/student/add",
    "/adboard/student/edit",
    "/adboard/parent",
    "/adboard/parent/add",
    "/adboard/parent/edit",
    "/adboard/course/add",
    "/adboard/dashboard/parent/create",
    "/adboard/course",
    "/adboard/course/edit",
    "/adboard/face-registration",
  ].includes(location.pathname);

  return (
    <div className={`App ${showSidebar ? "h-screen" : ""}`}>
      {showSidebar && <Sidebar />}
      <div className="App-content">
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/parent/login" element={<ParentLogin />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/adboard/signin" element={<AdminLogin />} />
          <Route path="/adboard/course/add" element={<CreateCourse />} />
          <Route path="/adboard/parent/add" element={<CreateParent />} />
          <Route path="/adboard/student/add" element={<CreateStudent />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route
            path="/student/dashboard/details"
            element={<StudentAttendanceDetails />}
          />
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/student/leave" element={<ApplyLeave />} />
          <Route path="/student/leave/dashboard" element={<StudentLeaveDashboard />} />
          <Route path="/faculty/leave" element={<FacultyLeaveDashboard />} />
          <Route path="/student/course/register" element={<OfferedCourses />} />
          <Route path="/student/course/view" element={<RegisteredCourses />} />
          <Route
            path="/student/reset-password"
            element={<ResetPasswordRoute />}
          />
          <Route
            path="/faculty/reset-password"
            element={<ResetPasswordRoute />}
          />
          <Route
            path="/parent/reset-password"
            element={<ResetPasswordRoute />}
          />
           <Route
            path="/student/account/change-password"
            element={<ChangePasswordRoute />}
          />
          <Route
            path="/faculty/account/change-password"
            element={<ChangePasswordRoute />}
          />
          <Route
            path="/parent/account/change-password"
            element={<ChangePasswordRoute />}
          />
          <Route path="/adboard/faculty" element={<FacultyAdboard />} />
          <Route path="/adboard/student" element={<StudentAdboard />} />
          <Route path="/adboard/parent" element={<ParentAdboard />} />
          <Route path="/adboard/course" element={<CourseAdboard />} />
          <Route path="/adboard/faculty/add" element={<CreateFaculty />} />
          <Route path="/adboard/faculty/edit" element={<EditFaculty />} />
          <Route path="/faculty/course/register" element={<CourseApproval />} />
          <Route path="/faculty/course/assign" element={<AssignCourse />} />
          <Route path="/faculty/course/mark-attendance" element={<MarkAttendance />} />
          <Route
            path="/faculty/account/information"
            element={<FacultyAccountDetails />}
          />
          <Route
            path="/student/account/information"
            element={<StudentAccountDetails />}
          /> 
           <Route
          path="/parent/account/information"
          element={<ParentAccountDetails />}
        />
          <Route path="/adboard/parent/edit" element={<EditParent />} />
          <Route path="/adboard/student/edit" element={<EditStudent />} />
          <Route path="/adboard/course/edit" element={<EditCourse />} />
          <Route path="/adboard/face-registration" element={<FacialRegAdboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default Layout;

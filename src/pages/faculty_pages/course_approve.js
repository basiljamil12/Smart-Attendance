
import React from "react";
import FacultyNavbar from "../../components/navbars/faculty_navbar";
import { useNavigate } from "react-router";

function CourseApproval() {
  const AttendanceData = [
    {
      stdname: "Moshu",
      courseTitle: "SDD",
      creditHrs: "2",
      status: "pending"
    },
    {
      stdname: "Hamza",
      courseTitle: "DSA",
      creditHrs: "2",
      status: "pending"
    },
  ];

  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/student/dashboard/details");
  };

  return (
    <div className="flex-col">
      <div>
        <FacultyNavbar />
      </div>
      <div className="w-full">
        {/* <div className="md:mt-10 md:ml-14 mt-16 md:flex md:items-start md:justify-start">
          <span className="text-sa-maroon  font-bold text-[32px] md:text-[36px]">
              Dashboard
          </span>
        </div> */}
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
              Course Request
            </span>

          </div>
          <div className="overflow-x-auto mt-10 mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl">
            <table className="table-fixed min-w-full bg-sa-pink w-[800px] md:w-[50vw] rounded-2xl">
              <thead>
                <tr className="border-b border-sa-grey">
                  <th className="p-0 py-5  border-r border-sa-grey w-[100px]">
                    #
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Student Name
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Course Title
                  </th>
                  <th className="p-0 py-5 border-r border-sa-grey">
                    Credit Hours
                  </th>
                  <th className="p-0 py-5 border-r border-sa-grey">
                    Actions
                  </th>
                  <th className="p-0 py-5  border-sa-grey">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {AttendanceData.map((faculty, index) => (
                  <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {index + 1}
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.stdname}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.courseTitle}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.creditHrs}
                      </span>
                    </td>
                    <td className="p-0 py-5 border-r border-sa-grey">
                      <div class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">
                        <button
                          class="bg-[#198754] lg:ml-2 text-white inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm  transition-opacity hover:opacity-90 hover:text-gray-300  focus:relative"
                        >
                          Approve
                        </button>
                        <div className="lg:border-l lg:mx-5 lg:border-sa-grey hidden lg:block"></div>
                        <div className="border-b mx-5 mt-5  border-sa-grey block lg:hidden"></div>
                        <button
                          class="inline-flex lg:mt-0 mt-5 items-center gap-2 rounded-md bg-[#d9534f] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90  hover:text-gray-300 shadow-sm focus:relative"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                    <td className="p-0 py-5   border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.status}
                      </span>
                    </td>
                 
                  </tr>
                ))}
                <tr className="border-b-0">
                  <td className="md:py-32 py-16 border-r border-sa-grey w-[100px]"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseApproval;

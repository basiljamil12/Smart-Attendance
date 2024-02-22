
import React from "react";
import { useNavigate } from "react-router";
import FacultyNavbar from "../../components/navbars/faculty_navbar";

function LeaveDashboard() {
    
    const navigate = useNavigate();
    const leaveApprovalData = [
        {
            studentName: "Basil",
            subject: "Accident",
            fromDate: "13/04/2023",
            toDate: "20/04/2023",
            status: "pending",
        },
        {
            studentName: "Diyan",
            subject: "Sick",
            fromDate: "16/04/2023",
            toDate: "23/04/2023",
            status: "pending",
        },
    ];


    const handleDetails = () => {
        //navigate("/student/dashboard/details");
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
                            Leave Approval
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
                                        Subject
                                    </th>
                                    <th className="p-0 py-5  border-r border-sa-grey">
                                        From Date
                                    </th>
                                    <th className="p-0 py-5  border-r border-sa-grey">
                                        To Date
                                    </th>
                                    <th className="p-0 py-5  border-r border-sa-grey">
                                        Details
                                    </th>
                                    <th className="p-0 py-5  border-sa-grey">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveApprovalData.map((faculty, index) => (
                                    <tr key={index} className="border-b border-sa-grey">
                                        <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                                            {index + 1}
                                        </td>
                                        <td className="p-0 py-5  border-r border-sa-grey">
                                            <span
                                                className="block w-full h-full overflow-hidden overflow-ellipsis"
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {faculty.studentName}
                                            </span>
                                        </td>
                                        <td className="p-0 py-5  border-r border-sa-grey">
                                            <span
                                                className="block w-full h-full overflow-hidden overflow-ellipsis"
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {faculty.subject}
                                            </span>
                                        </td>
                                        <td className="p-0 py-5  border-r border-sa-grey">
                                            <span
                                                className="block w-full h-full overflow-hidden overflow-ellipsis"
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {faculty.fromDate}
                                            </span>
                                        </td>
                                        <td className="p-0 py-5  border-r border-sa-grey">
                                            <span
                                                className="block w-full h-full overflow-hidden overflow-ellipsis"
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {faculty.toDate}
                                            </span>
                                        </td>
                                        <td className="p-2 py-5  border-r  border-sa-grey">
                                            <div class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">

                                                <button
                                                    class="bg-sa-maroon  text-white inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm  transition-opacity hover:opacity-90 hover:text-gray-300  focus:relative"
                                                    onClick={handleDetails}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                         
                                        </td>

                                        <td className="p-0 py-5    border-sa-grey">
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

export default LeaveDashboard;

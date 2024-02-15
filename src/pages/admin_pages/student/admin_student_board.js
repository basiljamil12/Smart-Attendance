import React from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import { useNavigate } from "react-router";
import { Button } from 'primereact/button';
function StudentAdboard() {
  const studentData = [
    {
      name: "Diyan Ali Shaikh",
      email: "shaikhdiyanali2002@gmail.com",
      contactNo: "03322829895",
    },
    {
      name: "Basil Jamil",
      email: "basiljamil112@gmail.com",
      contactNo: "69696969669",
    },
  ];

  const navigate = useNavigate();

  const goToAddStudent = () => {
    navigate("/adboard/student/add");
  };

  return (
    <div className="flex">
      <div className="w-full">
        <div className="md:mt-8 md:ml-8 mt-16 md:flex md:items-start md:justify-start">
          <span className="text-sa-maroon  font-bold text-xl md:text-3xl">
            Student Dashboard
          </span>
        </div>
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl md:text-2xl">
            Student List
            </span>
            <span
              className="transition-opacity hover:opacity-85 text-sa-maroon font-bold text-lg pt-0.5 underline hover:cursor-pointer"
              onClick={goToAddStudent}
            >
              Add Student
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
                  <th className="p-0 py-5  border-r border-sa-grey">Email</th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Contact No.
                  </th>
                  <th className="p-2 py-5  border-sa-grey">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {index + 1}
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {student.name}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {student.email}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {student.contactNo}
                      </span>
                    </td>
                    <td className="p-2 py-5  border-sa-grey">
                    <div  class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">
                   
  <button
    class="bg-sa-maroon md:mr-2 text-white inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm  transition-opacity hover:opacity-90 hover:text-gray-300  focus:relative"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-4 w-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>

    Edit
  </button>



  <button
    class="inline-flex lg:mt-0 mt-2 items-center gap-2 rounded-md bg-[#d9534f] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90  hover:text-gray-300 shadow-sm focus:relative"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-4 w-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>

    Delete
  </button>
</div>
                      {/* <span className="text-sa-maroon text-md underline mx-2 hover:cursor-pointer">
                        Edit
                      </span>
                      <span>|</span>
                      <span className="text-sa-maroon text-md underline mx-2 hover:cursor-pointer">
                        Delete
                      </span> */}
                    </td>
                  </tr>
                ))}
                <tr className="border-b-0">
                  <td className="md:py-32 py-16 border-r border-sa-grey w-[100px]"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-32 py-16  border-sa-grey"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAdboard;

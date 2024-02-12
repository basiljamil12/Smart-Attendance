import React from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import { useNavigate } from "react-router";

function FacultyAdboard() {
  const facultyData = [
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

  const goToAddFaculty = () => {
    navigate("/adboard/faculty/add");
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="md:mt-8 md:ml-8 mt-16 md:flex md:items-start md:justify-start">
          <span className="text-sa-maroon  font-bold text-xl md:text-3xl">
            Faculty Dashboard
          </span>
        </div>
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl md:text-2xl">
              Faculty List
            </span>
            <span
              className="text-sa-maroon font-bold text-lg pt-0.5 underline hover:cursor-pointer"
              onClick={goToAddFaculty}
            >
              Add Faculty
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
                    Faculty Name
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">Email</th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Contact No.
                  </th>
                  <th className="p-2 py-5  border-sa-grey">Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyData.map((faculty, index) => (
                  <tr key={index} className="border-b border-sa-grey">
                    <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      {index + 1}
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.name}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.email}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {faculty.contactNo}
                      </span>
                    </td>
                    <td className="p-2 py-5  border-sa-grey">
                      <span className="text-sa-maroon text-md underline mx-2 hover:cursor-pointer">
                        Edit
                      </span>
                      <span>|</span>
                      <span className="text-sa-maroon text-md underline mx-2 hover:cursor-pointer">
                        Delete
                      </span>
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

export default FacultyAdboard;


import React from "react";
import FacultyNavbar from "../../components/navbars/faculty_navbar";

import { useNavigate } from "react-router";

function FacultyAccountDetails() {
  const AttendanceData = [
    {
      Name: "Basil",
      Email: "basil@hotmail.com",
      ContactNo: "1232112412",
    //   absentHrs: "2",
      isStudentAdvisor: "No",
    },
  ];

  const navigate = useNavigate();

  // const goToAddFaculty = () => {
  //   navigate("/adboard/faculty/add");
  // };

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
           Account Details
            </span>
          </div>
          <div className="flex justify-start md:mt-10 mt-10 mb-3 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
            Name:
            </span>
            <span className="text-sa-black font-bold ml-2 text-xl">
            {AttendanceData.map((data, index) => (
                <span key={index}>{data.Name}</span>
              ))}
            </span>
          </div>
          <div className="flex justify-start md:mt-4 mb-3 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
            Email: 
            </span>
            <span className="text-sa-black font-bold ml-2 text-xl">
            {AttendanceData.map((data, index) => (
                <span key={index}>{data.Email}</span>
              ))}
            </span>
          </div>
        
          <div className="flex justify-start md:mb-1 mb-3 md:mt-4 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
           Contact No:
            </span>
            <span className="text-sa-black font-bold ml-2 text-xl">
            {AttendanceData.map((data, index) => (
                <span key={index}>{data.ContactNo}</span>
              ))}
            </span>
          </div>
          <div className="flex justify-start md:mt-4 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
            Student Advisor:
            </span>
            <span className="text-sa-black font-bold ml-2 text-xl">
            {AttendanceData.map((data, index) => (
                <span key={index}>{data.isStudentAdvisor}</span>
              ))}
            </span>
          </div>
          
          
        </div>
      </div>
    </div>
  );
}

export default FacultyAccountDetails;

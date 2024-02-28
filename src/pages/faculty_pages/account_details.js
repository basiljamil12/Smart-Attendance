
import React, { useState, useEffect } from "react";

import FacultyNavbar from "../../components/navbars/faculty_navbar";
import FacultyDetailsManager from "../../models/faculty/auth/http/getdetails";
import { useNavigate } from "react-router";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
function FacultyAccountDetails() {
  const [facultyData, setFacultyData] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state
  const facultyDetailsManager = new FacultyDetailsManager();
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        const response = await facultyDetailsManager.get();
        if (response.success) {
          setFacultyData(response.data);
        } else {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: response.message,
            },
          ]);
        }
      } catch (error) {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: error.message,
          },
        ]);
      } finally {
        setShowLoading(false);
      }
    };

    fetchData();
  }, []);
  const AttendanceData = facultyData
  ? [
      {
        Name: facultyData.name,
        Email: facultyData.email,
        ContactNo: facultyData.contactno,
        isStudentAdvisor: facultyData.isStudentAdvisor ? "Yes" : "No",
      },
    ]
  : [];


  const navigate = useNavigate();

  // const goToAddFaculty = () => {
  //   navigate("/adboard/faculty/add");
  // };

  return (
    <div className="flex-col">
      <div>
        <FacultyNavbar />
      </div>
      {showLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
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
            <span className="text-sa-maroon font-bold md:text-xl">
            Name:
            </span>
            <span className="text-sa-black font-bold ml-2 md:text-xl">
            {AttendanceData.map((data, index) => (
                <span key={index}>{data.Name}</span>
              ))}
            </span>
          </div>
          <div className="flex justify-start md:mt-4 mb-3 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold md:text-xl">
            Email: 
            </span>
            <span className="text-sa-black font-bold ml-2 md:text-xl">
            {AttendanceData.map((data, index) => (
                <span key={index}>{data.Email}</span>
              ))}
            </span>
          </div>
        
          <div className="flex justify-start md:mb-1 mb-3 md:mt-4 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold md:text-xl">
           Contact No:
            </span>
            <span className="text-sa-black font-bold ml-2 md:text-xl">
            {AttendanceData.map((data, index) => (
                <span key={index}>{data.ContactNo}</span>
              ))}
            </span>
          </div>
          <div className="flex justify-start md:mt-4 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold md:text-xl">
            Student Advisor:
            </span>
            <span className="text-sa-black font-bold ml-2 md:text-xl">
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

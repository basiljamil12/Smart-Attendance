import React, { useState, useEffect } from "react";


import ParentNavbar from "../../components/navbars/parent_navbar"; // Assuming there's a separate navbar component for students
import StudentDetailsManager from "../../models/student/auth/http/get_details";
import { useNavigate } from "react-router";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
function ParentAccountDetails() {
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state
  const studentDetailsManager = new StudentDetailsManager();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true);
      try {
        const response = await studentDetailsManager.get();
        if (response.success) {
          setStudentData(response.data);
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

  const data = studentData
  ? [
      {
        Name: studentData.name,
        Email: studentData.email,
        ContactNo: studentData.contactno,
        // isStudentAdvisor: studentData.isStudentAdvisor ? "Yes" : "No",
      },
    ]
  : [];
  // const AccountData = [
  //   {
  //     Name: "John",
  //     Email: "john@example.com",
  //     ContactNo: "1234567890",
  //     // FaceIDImageURL: "https://img.freepik.com/free-photo/indoor-portrait-displeased-discontent-upset-male-model-with-trendy-hairdo-mustache-beard-wears-round-glasses_273609-8721.jpg"
  //   },
  // ];

 

  return (
    <div className="flex-col">
      <div>
        <ParentNavbar />
      </div>
      <div className="w-full">
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
              Account Details
            </span>
          </div>
          {/* <div className="flex justify-start mt-10 mb-3 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
              Face ID:
            </span>
          </div>
          <div className="flex justify-start items-start mx-10 md:mx-24 mb-8">
            <div className="w-52 h-52 border border-gray-400 rounded-lg overflow-hidden">
              <img src={AccountData[0].FaceIDImageURL} alt="Face ID" className="w-full h-full object-cover" />
            </div>
          </div> */}
          
          <div className="flex justify-start md:mt-10 mb-3  mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
              Name:
            </span>
            <span className="text-sa-black font-bold ml-2 text-xl">
              {data.map((data, index) => (
                <span key={index}>{data.Name}</span>
              ))}
            </span>
          </div>
          <div className="flex justify-start md:mt-4 mb-3 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
              Email:
            </span>
            <span className="text-sa-black font-bold ml-2 text-xl">
              {data.map((data, index) => (
                <span key={index}>{data.Email}</span>
              ))}
            </span>
          </div>
          <div className="flex justify-start md:mb-1 mb-3 md:mt-4 mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-xl">
              Contact No:
            </span>
            <span className="text-sa-black font-bold ml-2 text-xl">
              {data.map((data, index) => (
                <span key={index}>{data.ContactNo}</span>
              ))}
            </span>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default ParentAccountDetails;

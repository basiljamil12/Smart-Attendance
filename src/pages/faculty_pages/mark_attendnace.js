
import React, { useEffect, useRef, useState } from "react";

import FacultyNavbar from "../../components/navbars/faculty_navbar";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";

import { useNavigate } from "react-router";

function MarkAttendance() {
    const [attachment, setAttachment] = useState("");
    const [toastMessages, setToastMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const AttendanceData = [
        {
            stdName: "SDD",
            creditHrs: "2",
        },
        {
            stdName: "DSA",
            creditHrs: "3",
        },
    ];

    const navigate = useNavigate();

    // const goToAddFaculty = () => {
    //   navigate("/adboard/faculty/add");
    // };
    function updateFileName(event) {
        const files = event.target.files;
        let fileNames = "";

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setAttachment(file);
                const fileName = file.name;
                const allowedExtensions = [".png", ".jpeg", ".jpg"];
                const extension = fileName.substring(fileName.lastIndexOf("."));

                if (allowedExtensions.includes(extension)) {
                    fileNames += fileName;
                    if (i !== files.length - 1) {
                        fileNames += ", ";
                    }
                    const reader = new FileReader();
                    reader.onload = () => {
                        setSelectedImage(reader.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    setToastMessages([
                        ...toastMessages,
                        {
                            type: "invalid",
                            title: "Invalid File",
                            body: "Only .png, jpeg, and JPG files are allowed",
                        },
                    ]);
                    // Clear the input field
                    document.getElementById("fileInput").value = "";

                    return; // Exit the function if an invalid file is found
                }
            }
            document.getElementById("attachements").value = fileNames;
        } else {
            // Clear the input field if no file is selected
            document.getElementById("attachements").value = "";
            setSelectedImage(null);
        }
    }

    const [isManualAttendance, setisManualAttendance] = useState(false);

    const [selectedRadio, setSelectedRadio] = useState(Array(AttendanceData.length).fill(null));

    const handleRadioChange = (radioIndex, rowIndex) => {
      const updatedSelectedRadio = [...selectedRadio];
      updatedSelectedRadio[rowIndex] = radioIndex === selectedRadio[rowIndex] ? null : radioIndex;
      setSelectedRadio(updatedSelectedRadio);
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
                    <div className="flex justify-between mx-10 mb-10 md:mx-24">
                        <span className="text-sa-maroon font-bold text-3xl md:text-4xl">
                            Dashboard
                        </span>

                    </div>
                    <div className="flex justify-between mx-10 mb-3 md:mx-24">
                        <span className="text-sa-maroon font-bold text-lg md:text-xl">
                            Course Title:
                        </span>

                    </div>
                    <div className="flex justify-between mx-10 mb-3 md:mx-24">
                        <span className="text-sa-maroon font-bold text-lg md:text-xl">
                            Teacher Name:
                        </span>

                    </div>
                    <div className="flex justify-between mx-10 md:mb-7 mb-5  md:mx-24">
                        <span className="text-sa-maroon font-bold text-lg md:text-xl">
                            Credit Hours:
                        </span>

                    </div>
                    <div className="flex justify-between mx-10   md:mx-24">
                    <div className="flex mb-5">
              <span className="text-sa-maroon text-xl font-semibold">Manual Attendance</span>
              <div className="ml-5 mt-1">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    id="winners"
                    class="sr-only peer"
                    onClick={() => setisManualAttendance(!isManualAttendance)}
                  />
                  <div class="w-11 h-6  peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-clue-purchase  rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-sa-maroon"></div>
                </label>
              </div>
            </div>
                    </div>
                    {!isManualAttendance && (
                        <>
                    <div className="flex-col justify-center items-center md:ml-20 ml-5 mx-[4%] ">
                        <div className="md:ml-3 ml-2 md:mb-5 mb-10 ">
                            {/* <label
            className="text-sa-black block text-left  text-[20px] font-[600] mb-2 text-filter-heading"
            htmlFor="link"
          >
            Attachements (Optional)
          </label> */}

                            <form>
                                <div className="relative md:mb-5 mb-6">
                                    <input
                                        type="search"
                                        id="attachements"
                                        className="placeholder-gray-500  placeholder:md:text-base placeholder:text-sm  focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon h-14 md:h-16 py-4 block w-full p-4 border border-black border-solid text-black rounded-xl bg-white focus:ring-blue-500"
                                        placeholder="No File Choosen "
                                        required
                                        disabled
                                     
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="hover:scale-105 transition-all duration-300 ease-in-out md:text-base text-sm  hover:opacity-90 md:mr-3 text-white absolute end-2.5 bottom-2.5 bg-sa-maroon focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  md:px-5 px-2 md:py-2.5 py-2  cursor-pointer"
                                    >
                                        Choose an Image
                                        <input
                                            type="file"
                                            //multiple
                                            id="fileInput"
                                            accept=".png, .jpeg, .jpg"
                                            className="hidden"
                                            onChange={updateFileName}
                                        />
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className=" md:ml-3 ml-2 border-sa-maroon  flex justify-center items-center md:mt-14">
                            <div className="border rounded-xl flex justify-center items-center border-sa-maroon h-[300px] md:h-[500px] w-[80%] md:w-[45%]">
                                {!selectedImage && (
                                    <div className="text-center text-xl font-semibold text-sa-maroon">
                                        Image of classroom
                                    </div>
                                )}
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt="Selected"
                                        className="  max-h-[500px] w-full rounded-xl"
                                    />

                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex  mt-10 justify-center items-center">
                        <button
                            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
                            class=" hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]   rounded-[20px]   bg-clip-padding md:px-24  px-6 py-2  leading-tight text-white text-[20px] md:text-[24px]"

                        >Confirm</button>
                        <button
                            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
                            class=" md:ml-12  ml-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]   md:px-24 px-6  rounded-[20px]   bg-clip-padding  py-2  leading-tight text-white text-[20px] md:text-[24px]"

                        >Remove</button>
                    </div>
                    </>)}
                    <div className="flex justify-between  md:ml-[5%] mx-10">
  {isManualAttendance ? (
    <span className="text-sa-maroon font-bold md:ml-5 md:mt-6 mt-4 text-[28px] md:text-3xl">
      Mark Attendance
    </span>
  ) : (
    <span className="text-sa-maroon font-bold md:ml-5 md:mt-10 mt-10 text-[28px] md:text-3xl">
      Edit Attendance
    </span>
  )}
</div>

                    <div className="overflow-x-auto md:mt-8 mt-6 md:mb-10 mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl">
                        <table className="table-fixed min-w-full bg-sa-pink w-[800px] md:w-[50vw] rounded-2xl">
                            <thead>
                                <tr className="border-b border-sa-grey">
                                    <th className="p-0 py-5  border-r border-sa-grey w-[100px]">
                                        #
                                    </th>
                                    <th className="p-0 py-5  border-r border-sa-grey">
                                        Name of Student
                                    </th>
                                    <th className="p-0 py-5  border-r border-sa-grey">
                                        Present
                                    </th>
                                    <th className="p-0 py-5  border-sa-grey">
                                        Absent
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {AttendanceData.map((faculty, rowIndex) => (
                               <tr key={rowIndex} className="border-b  border-sa-grey">
                               <td className="p-0 py-5  border-r  border-sa-grey w-[100px]">
                                   {rowIndex + 1}
                               </td>
                               <td className="p-0 py-5  border-r border-sa-grey">
                                   <span
                                       className="block w-full h-full overflow-hidden overflow-ellipsis"
                                       style={{ wordWrap: "break-word" }}
                                   >
                                       {faculty.stdName}
                                   </span>
                               </td>
                               <td className="p-0 py-5 border-r  border-sa-grey">
                                   <div className="w-full h-full flex items-center justify-center">
                                       <input
                                           type="radio"
                                           id={`present-${rowIndex}`}
                                           name={`attendance-${rowIndex}`}
                                           checked={selectedRadio[rowIndex] === 0}
                                           className="hidden"
                                           onChange={() => handleRadioChange(0, rowIndex)}
                                       />
                                       <label
                                           htmlFor={`present-${rowIndex}`}
                                           className={`block w-6 h-6 rounded-full border-2 border-gray-600 cursor-pointer ${
                                               selectedRadio[rowIndex] === 0 ? "bg-sa-maroon border-none" : ""
                                           }`}
                                       ></label>
                                   </div>
                               </td>
                               <td className="p-0 py-5  border-sa-grey">
                                   <div className="w-full h-full flex items-center justify-center">
                                       <input
                                           type="radio"
                                           id={`absent-${rowIndex}`}
                                           name={`attendance-${rowIndex}`}
                                           checked={selectedRadio[rowIndex] === 1}
                                           className="hidden"
                                           onChange={() => handleRadioChange(1, rowIndex)}
                                       />
                                       <label
                                           htmlFor={`absent-${rowIndex}`}
                                           className={`block w-6 h-6 rounded-full border-2 border-gray-600  cursor-pointer ${
                                               selectedRadio[rowIndex] === 1 ? "bg-sa-maroon  border-none" : ""
                                           }`}
                                       ></label>
                                   </div>
                               </td>
                           </tr>
                                ))}
                                <tr className="border-b-0">
                                    <td className="md:py-32 py-16 border-r border-sa-grey w-[100px]"></td>
                                    <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-32 py-16 border-r border-sa-grey"></td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex md:mt-14 mt-10 mb-10 justify-center items-center">
                        <button
                            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
                            class=" hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]   rounded-[20px]   bg-clip-padding md:px-24 px-16 py-2  leading-tight text-white text-[20px] md:text-[24px]"

                        >Submit</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarkAttendance;

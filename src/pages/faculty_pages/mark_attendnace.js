
import React, { useEffect, useRef, useState } from "react";

import FacultyNavbar from "../../components/navbars/faculty_navbar";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
import { useNavigate, useLocation } from "react-router";
import GetFacultyCourseManager from "../../models/courses/http/getCourseByFaculty";
import CreateAttendanceManager from "../../models/attendance/http/create_attendance";
import AttendanceManager from "../../models/attendance/http/get_attendance";
function MarkAttendance() {
    const createAttendanceManager = new CreateAttendanceManager();
    const attendanceManager = new AttendanceManager();
    const [facultyData, setFacultyData] = useState(null);
    const [initialAttendanceData, setInitialAttendanceData] = useState(null);
    const [submitShowLoading, setSubmitShowLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [toastMessages, setToastMessages] = useState([]); //
    const [isAttendanceMarked, setisAttendanceMarked] = useState(false); //
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const forId = searchParams.get("courseId");
    const getFacultyCourseManager = new GetFacultyCourseManager();
    const [selectedHour, setSelectedHour] = useState(null);
    const [topic, setTopic] = useState("");

    useEffect(() => {
        const firstFetchData = async () => {
            if (!forId) {
                navigate("/faculty/dashboard");
            }
            setShowLoading(true);
            try {
                const response = await attendanceManager.getByDate(forId);
                if (response.success) {
                    setisAttendanceMarked(true);
                    // initialAttendanceData(true);
                    setSelectedHour(response.data.attendance_hours);
                    setTopic(response.data.topics);
                    setInitialAttendanceData(response.data.attendance);

                    // Set initial state for radio buttons
                    const initialRadioState = response.data.attendance.map(({ status }) => {
                        return status === 'present' ? 0 : 1;
                    });
                    setSelectedRadio(initialRadioState);

                } else {
                    setisAttendanceMarked(false);
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

        firstFetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            if (!forId) {
                navigate("/faculty/dashboard");
            }
            setShowLoading(true);
            try {
                const response = await getFacultyCourseManager.getbyId(forId);
                if (response.success) {
                    setFacultyData(response.data);
                } else {
                    navigate("/faculty/dashboard");
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
                courseCode: facultyData.courseCode,
                courseTitle: facultyData.courseName,
                courseTeacherName: facultyData.courseTeacher.name,
                creditHrs: facultyData.courseCredHrs,
                studentRecords: facultyData?.studentsEnrolled?.map(record => ({
                    stdId: record?._id,
                    stdName: record?.name,
                    topic: record?.topics,
                    presenthrs: record?.present_hours,
                    absenthrs: record?.absent_hours,
                    hours: record?.hours,
                    status: record?.status
                })),
                // stdName: facultyData.studentsEnrolled.map(student => student.name),
            },
        ]
        : [];
    const [attachment, setAttachment] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

 
    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };
    const [isConfirm, setisConfirm] = useState(false);

    const handleConfirm = () => {
        setisConfirm(true);
    };

    
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
    useEffect(() => {
        setisManualAttendance(isAttendanceMarked);
        setisConfirm(isAttendanceMarked);
    }, [isAttendanceMarked])

    const [selectedRadio, setSelectedRadio] = useState(Array.from({ length: facultyData?.studentsEnrolled?.length || 0 }, () => 0));
   

    const handleRadioChange = (radioIndex, rowIndex) => {
        const updatedSelectedRadio = [...selectedRadio];
        updatedSelectedRadio[rowIndex] = radioIndex;
        setSelectedRadio(updatedSelectedRadio);
    };

    const handleHourChange = (selectedHour) => {
        const parsedHour = parseInt(selectedHour, 10); // Parse selectedHour as an integer
        setSelectedHour(parsedHour);
    };

    const handleSubmit = async () => {

        try {
            setSubmitShowLoading(true);
            const courseId = searchParams.get("courseId"); // Assuming courseId is obtained from somewhere
            const attendance_hours = selectedHour;
            const topics = topic;

            const attendance = AttendanceData.flatMap((faculty) => {

                if (faculty && faculty.studentRecords) {
                    return faculty.studentRecords.map((record, recordIndex) => ({
                        studentId: record?.stdId,
                        status: selectedRadio[recordIndex] === 0 ? "present" : "absent",
                    }));
                } else {
                    return [];
                }
            });
            let response;
            // Make the API request individually
            if (isAttendanceMarked) {
                response = await createAttendanceManager.update(courseId, attendance_hours, topics, attendance);
            }
            else {
                response = await createAttendanceManager.create(courseId, attendance_hours, topics, attendance);
            }

            if (response.success) {
                const updatedToastMessages = [
                    ...toastMessages,
                    {
                        type: "success",
                        title: "Success",
                        body: response.message,
                    },
                ];
                setToastMessages(updatedToastMessages);
                navigate("/faculty/dashboard", { state: { toastMessages: updatedToastMessages } });


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
            setSubmitShowLoading(false);
        }
    };
    return (
        <div className="flex-col w-full">
            <div>
                <FacultyNavbar />
            </div>
            {toastMessages.map((toast, index) => (
                <Toast
                    className="mb-0"
                    key={index}
                    toasts={[toast]}
                    onClose={() => {
                        // Remove the toast message when it's closed
                        const updatedToasts = [...toastMessages];
                        updatedToasts.splice(index, 1);
                        setToastMessages(updatedToasts);
                    }}
                />
            ))}
            {showLoading ? (
                <div className="flex justify-center items-center w-full h-screen">
                    <Spinner />
                </div>
            ) : (
                <div className="w-full">

                    <div className="md:mt-14 mt-10 w-full">
                        <div className="flex justify-between mx-10 mb-10 md:mx-24">
                            <span className="text-sa-maroon font-bold text-3xl md:text-4xl">
                                {isAttendanceMarked ? "Edit Attendance" : "Mark Attendance"}
                            </span>

                        </div>
                        <div className="flex items-start mx-10 mb-3 ">
                            <span className="text-sa-maroon font-bold text-lg md:ml-14 md:text-xl">
                                Course Title:
                            </span>
                            <span className="text-sa-black font-bold text-lg ml-3 md:text-xl">
                                {facultyData && (
                                    <span>{facultyData.courseName}</span>
                                )} </span>

                        </div>
                        <div className="flex items-start mx-10 mb-3 ">
                            <span className="text-sa-maroon font-bold text-lg  md:ml-14  md:text-xl">
                                Teacher Name:
                            </span>
                            <span className="text-sa-black font-bold text-lg ml-3 md:text-xl">
                                {facultyData && (
                                    <span>{facultyData.courseTeacher.name}</span>
                                )}    </span>
                        </div>
                        <div className="flex items-start mx-10 md:mb-4 mb-5 ">
                            <span className="text-sa-maroon font-bold  md:ml-14  text-lg md:text-xl">
                                Credit Hours:
                            </span>
                            <span className="text-sa-black font-bold text-lg ml-3 md:text-xl">
                                {facultyData && (
                                    <span>
                                        {facultyData.courseCredHrs}</span>

                                )}    </span>
                        </div>
                        <div className="flex items-start mx-10  md:ml-24  border-b-2 border-sa-grey my-7"></div>
                        <div className="flex justify-between mx-10 md:mx-24">
                            <div className="flex mb-5">
                                <span className="text-sa-maroon text-xl font-semibold">Manual Attendance</span>
                                <div className="ml-5 mt-1">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                   
                                        <input
                                            type="checkbox"
                                            id="manualAttendance"
                                            className="sr-only peer"
                                            checked={isManualAttendance}
                                            onClick={() => {
                                                setisManualAttendance(!isManualAttendance);
                                                
                                                setisConfirm(!isManualAttendance);
                                                console.log("mew",isConfirm); // Set isConfirm based on isManualAttendance
                                            }}
                                            disabled={isAttendanceMarked} // Conditionally disable checkbox
                                        />
                                        <div className={`w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-clue-purchase rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-sa-maroon ${isAttendanceMarked ? 'peer-checked:bg-gray-700 cursor-not-allowed' : ''}`}>

                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start md:mx-24 mx-10 md:mb-2 mb-5">
                            <span className="text-sa-maroon font-bold text-lg md:text-xl">
                                Select Hours:
                            </span>
                            <div className="flex ml-5">
                                {AttendanceData.map((data, index) => (
                                    <div key={index} className="flex">
                                        {[...Array(parseInt(data.creditHrs)).keys()].map((hour) => (
                                            <div key={hour} className="flex items-center ml-4">
                                                <input
                                                    type="radio"
                                                    id={`hour-${hour + 1}`}
                                                    name={`selectedHour-${index}`}
                                                    value={hour + 1}
                                                    className="mr-2 hidden"
                                                    checked={selectedHour}
                                                    onChange={(e) => handleHourChange(e.target.value)}
                                                />
                                                <label
                                                    htmlFor={`hour-${hour + 1}`}
                                                    className={`block w-6 h-6 rounded-full border-2 border-gray-600 cursor-pointer ${parseInt(selectedHour) === hour + 1 ? "bg-sa-maroon border-none" : ""
                                                        }`}
                                                ></label>
                                                <span className="ml-2">{hour + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex  mx-10 mb-3  ">
                            <span className="text-sa-maroon text-left font-bold text-lg  md:ml-14 mt-4  md:text-xl">
                                Topic Covered in Class:
                            </span>
                        </div>
                        <div className="flex   md:ml-24 md:mx-10 mx-10 mb-10  ">

                            <input
                                type="text"
                                id="topic"
                                placeholder="Topic Name"
                                onChange={handleTopicChange}
                                value={topic}
                                className="placeholder-gray-500 w-full  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon "
                            />
                        </div>

                        <div className="flex items-start mx-10  md:ml-24 border-b-2 border-sa-grey mb-5 "></div>

                        {!isManualAttendance && (
                            <>
                                <div className="flex-col justify-center items-center md:ml-20 ml-8 mx-10  ">
                                    <div className="md:ml-3 ml-2 md:mb-5 mb-10 ">
                                        <div className="flex   mb-3  ">
                                            <span className="text-sa-maroon text-left font-bold text-lg mt-2   md:text-xl">
                                                Upload Image
                                            </span>
                                        </div>
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
                                <div className="flex mb-20 mt-10 justify-center items-center">
                                    <button
                                        //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
                                        class=" hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]   rounded-[20px]   bg-clip-padding md:px-24  px-6 py-2  leading-tight text-white text-[20px] md:text-[24px]"
                                        onClick={handleConfirm}
                                    >Confirm</button>
                                    <button
                                        //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
                                        class=" md:ml-12  ml-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]   md:px-24 px-6  rounded-[20px]   bg-clip-padding  py-2  leading-tight text-white text-[20px] md:text-[24px]"

                                    >Remove</button>
                                </div>
                            </>)}
                        {isManualAttendance && (
                            <>
                                <div className="flex justify-between  md:ml-[5%] mx-10">
                                    {isAttendanceMarked ? (
                                        <span className="text-sa-maroon font-bold md:ml-5 md:mt-6 mt-4 text-[28px] md:text-3xl">
                                            Attendance
                                        </span>
                                    ) : (
                                        <span className="text-sa-maroon font-bold md:ml-5 md:mt-10 mt-4 text-[28px] md:text-3xl">
                                            Mark Attendance
                                        </span>
                                    )}
                                </div>

                                <div className="overflow-x-auto md:mt-8 mt-6 mb-14  mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl">
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
                                                faculty?.studentRecords?.map((record, recordIndex) => (
                                                    <tr key={recordIndex} className="border-b border-sa-grey">
                                                        <td className="p-0 py-5 border-r border-sa-grey w-[100px]">
                                                            {recordIndex + 1}
                                                        </td>
                                                        <td className="p-0 py-5 border-r border-sa-grey">
                                                            <span
                                                                className="block w-full h-full overflow-hidden overflow-ellipsis"
                                                                style={{ wordWrap: "break-word" }}
                                                            >
                                                                {record.stdName}
                                                            </span>
                                                        </td>
                                                        <td className="p-0 py-5 border-r border-sa-grey">
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <input
                                                                    type="radio"
                                                                    id={`present-${recordIndex}`}
                                                                    name={`attendance-${recordIndex}`}
                                                                    checked={selectedRadio[recordIndex] === 0}
                                                                    className="hidden"
                                                                    onChange={() => handleRadioChange(0, recordIndex)}
                                                                />
                                                                <label
                                                                    htmlFor={`present-${recordIndex}`}
                                                                    className={`block w-6 h-6 rounded-full border-2 border-gray-600 cursor-pointer ${selectedRadio[recordIndex] === 0 ? "bg-sa-maroon border-none" : ""}`}
                                                                ></label>
                                                            </div>
                                                        </td>
                                                        <td className="p-0 py-5 border-sa-grey">
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <input
                                                                    type="radio"
                                                                    id={`absent-${recordIndex}`}
                                                                    name={`attendance-${recordIndex}`}
                                                                    checked={selectedRadio[recordIndex] === 1}
                                                                    className="hidden"
                                                                    onChange={() => handleRadioChange(1, recordIndex)}
                                                                />
                                                                <label
                                                                    htmlFor={`absent-${recordIndex}`}
                                                                    className={`block w-6 h-6 rounded-full border-2 border-gray-600 cursor-pointer ${selectedRadio[recordIndex] === 1 ? "bg-sa-maroon border-none" : ""}`}
                                                                ></label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ))}
                                            <tr className="border-b-0">
                                                <td className="md:py-32 py-16 border-r border-sa-grey w-[100px]"></td>
                                                <td className="md:py-32 py-16 border-r border-sa-grey"></td>
                                                <td className="md:py-32 py-16 border-r border-sa-grey"></td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>)}
                            {(isManualAttendance || isConfirm) && ( // Render if manual attendance is false or isConfirm is true
    <div className="flex mb-14 justify-center items-center">
        <button
            onClick={handleSubmit}
            className="hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px] rounded-[20px] bg-clip-padding md:px-32 px-20 py-2 leading-tight text-white text-[20px] md:text-[24px]"
        >
            {submitShowLoading ? <Spinner /> : 'Submit'}
        </button>
    </div>
)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MarkAttendance;

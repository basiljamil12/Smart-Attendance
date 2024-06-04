import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StudentManager from "../../../models/admin/student/http/get_all_student";
import Spinner from "../../../components/spinner/spinner";
import Toast from "../../../components/toast/toast";
import { useLocation } from "react-router-dom";
import FaceIdManager from "../../../models/admin/student/http/faceId_http";
function FacialRegAdboard() {

    const studentManager = new StudentManager();
    const createFaceIdManager = new FaceIdManager();

    const [studentData, setStudentData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const location = useLocation();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false); // State for upload progress
    const [removeShowloading, setRemoveShowLoading] = useState(false); // State for upload progress

    const [toastMessages, setToastMessages] = useState(
        location.state?.toastMessages || []
    ); // Set initial toastMessages from location state
    useEffect(() => {
        // Check if there are toast messages in the location state
        if (location.state?.toastMessages) {
            // Display the toast message
            const toastMessage = location.state.toastMessages[0]; // Assuming there's only one toast message
            setToastMessages([toastMessage]);

            // Clear the location state after showing the toast message
            setTimeout(() => {
                window.history.replaceState({}, document.title, window.location.pathname);
            }, 0);
        }
    }, [location.state]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [studentID, setStudentID] = useState("");

    const closePopup = () => {

        setIsPopupOpen(false);
        setStudentID("");

    };
    const openPopup = (id) => {
        setStudentID(id);
        setIsPopupOpen(true);
    };
    const navigate = useNavigate();

    useEffect(() => {
        getAllStudent();
    }, []);

    const getAllStudent = () => {
        setShowLoading(true);
        studentManager.getAll().then((value) => {
            if (value == null) {
            } else if (!value.error) {
                const baseResponse = value.success;
                if (baseResponse == true) {
                    setStudentData(value.data);
                    setShowLoading(false);
                } else {
                    setToastMessages([
                        ...toastMessages,
                        {
                            type: "invalid",
                            title: "Error",
                            body: value.message,
                        },
                    ]);
                }
            } else {
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "error",
                        title: "Error",
                        body: value.error,
                    },
                ]);
            }
        });
    };

    const goToAddStudent = () => {
        navigate("/adboard/student/add");
    };

    const handleRemove = async () => {
        setRemoveShowLoading(true);
        try {

            const response = await createFaceIdManager.delete(studentID);
            if (response.success) {
                closePopup();
                getAllStudent();
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "success",
                        title: "Success",
                        body: response.message,
                    },
                ]);
            }
            else { // Hide progress bar
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "invalid",
                        title: "Error",
                        body: response.message,
                    },
                ]);
            }
            // Handle success response if needed
        } catch (error) {

            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Error",
                    body: error,
                },
            ]);
        }
        finally{
        setRemoveShowLoading(false);

        }
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleNavigate = (idx) => {
        const id = studentData[idx]._id;
        navigate("/adboard/student/edit?id=" + id);
    };
    const [uploadShowLoading, setUploadShowLoading] = useState(false);

    const [studentId, setStudentId] = useState("");
    const [isUpload, setIsUpload] = useState("");

    const openIsUpload = (id) => {
        setUploadProgress(0);
        setVideoFile(null);
        setToastMessages([]);
        setStudentId(id);
        setIsUpload(true);
    };
    const closeIsUpload = () => {
        setIsUpload(false);
        setToastMessages([]);
    };
    const [videoFile, setVideoFile] = useState(null);
    const [videoSizeError, setVideoSizeError] = useState("");

    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            // User canceled the upload, reset the videoFile state
            setVideoFile(null);
            return;
        }
        const video = document.createElement('video');
        const videoURL = URL.createObjectURL(file);
        video.src = videoURL;

        video.onloadedmetadata = () => {
            const { duration } = video;
            if (duration > 8) {
                setVideoSizeError(true);
                setVideoFile(file);
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "invalid",
                        title: "Error",
                        body: "Please select a video with a maximum duration of 5 seconds.",
                    },
                ]);

            } else {
                setVideoFile(file);
                setVideoSizeError(false);
            }
        };

        video.onerror = () => {
            alert('Error loading video.');
        };

        video.onended = () => {
            URL.revokeObjectURL(videoURL);
        };
    };
    let responseReceived = false;
    let response;
    const uploadVideo = async () => {

        if (!videoFile) {
            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Error",
                    body: "Video must be selected.",
                },
            ]);
            // User canceled the upload, reset the videoFile state

            return;
        }
        if (videoSizeError) {
            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Error",
                    body: "Please select a video with a maximum duration of 5 seconds.",
                },
            ]);
            // User canceled the upload, reset the videoFile state

            return;
        }

        try {
            setUploading(true);
            response = await createFaceIdManager.create(studentId, videoFile);
            if (response.success) {
                responseReceived = true;
                getAllStudent();
            }
            else {
                setVideoFile(null);
                setUploading(false); // Hide progress bar
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "invalid",
                        title: "Error",
                        body: response.message,
                    },
                ]);
            }
            // Handle success response if needed
        } catch (error) {
            setUploading(false); // Hide progress bar
            setVideoFile(null);
            closeIsUpload();
            setToastMessages([
                ...toastMessages,
                {
                    type: "invalid",
                    title: "Error",
                    body: error,
                },
            ]);
        }
        finally {
            closeIsUpload();
            setUploading(false); // Hide progress bar
            if (!responseReceived) {
                // setUploadProgress(99); 
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "invalid",
                        title: "Error",
                        body: "Service is currently unavailable. Try again later",
                    },
                ]);// Set progress to 99% if response is not received within 65 seconds
                // Stop progress estimation
                setUploadProgress(0);
            }
            else {
                setToastMessages([
                    ...toastMessages,
                    {
                        type: "success",
                        title: "Registeration Successful",
                        body: response.message,
                    },
                ]);
            }
        }
    };
    useEffect(() => {
        let startTime;
        let uploadInterval;

        if (uploading) {

            startTime = Date.now();
            uploadInterval = setInterval(() => {
                // if(!uploadProgress==99){
                const elapsedTime = Date.now() - startTime;
                const estimatedProgress = Math.min((elapsedTime / 60000) * 100, 99); // Adjusted for 1 minute 10 seconds upload time
                setUploadProgress(Math.round(estimatedProgress));
                // }
                if (estimatedProgress >= 99 && !responseReceived) {
                    // If progress is 99% and responseReceived is false, keep progress at 99%
                    setUploadProgress(99);
                } else {
                    // Otherwise, update progress normally
                    setUploadProgress(Math.round(estimatedProgress));
                }
                if (responseReceived) {
                    clearInterval(uploadInterval);
                    setUploadProgress(100);

                }
            }, 1000);
        }

        return () => clearInterval(uploadInterval);
    }, [uploading, responseReceived]);

    return (
        <div className="flex">
            {toastMessages.map((toast, index) => (
                <Toast
                    className="mb-0"
                    key={index}
                    toasts={[toast]}
                    onClose={() => {
                        const updatedToasts = [...toastMessages];
                        updatedToasts.splice(index, 1);
                        setToastMessages(updatedToasts);
                    }}
                />
            ))}

            {showLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Spinner />
                </div>
            )}
            <div className="w-full">
                <div className="md:mt-8 md:ml-8 mt-16 md:flex md:items-start  md:justify-start">
                    <span className="text-sa-maroon  font-bold text-2xl md:text-3xl">
                        Face Registration Dashboard
                    </span>
                </div>
                <div className="md:mt-14 mt-10">
                    <div className="flex justify-between xl:mx-16 mx-10">

                        <span className="text-sa-maroon font-bold text-xl md:mt-0 mt-2 md:text-2xl">
                            Student List
                        </span>

                    </div>
                    <div className="mb-20 overflow-x-auto mt-10 mx-10 lg:ml-[6%] lg:w-[90%] lg:shadow-xl rounded-2xl">
                        <table className="table-fixed min-w-full bg-sa-pink w-[800px] lg:w-[50vw] rounded-2xl">
                            <thead>
                                <tr className="border-b border-sa-grey">
                                    <th className="p-0 py-5  border-r border-sa-grey w-[100px]">
                                        #
                                    </th>
                                    <th className="p-0 py-5  border-r border-sa-grey">
                                        Student Name
                                    </th>
                                    <th className="p-0 py-5  border-r border-sa-grey">Email</th>

                                    <th className="p-2 py-5 border-r border-sa-grey">Actions</th>
                                    <th className="p-2 py-5  border-sa-grey">Status</th>
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
                                                className="block mx-2 h-full overflow-hidden overflow-ellipsis"
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {student.email}
                                            </span>
                                        </td>

                                        <td className="p-2 py-5 border-r  border-sa-grey">

                                            <div className="xl:inline-flex items-center justify-center w-full h-full overflow-hidden overflow-ellipsis rounded-lg border bg-sa-pink p-1" style={{ wordWrap: "break-word" }}>
                                                {student && student.registered_face === true ? (
                                                    <button
                                                        className="px-[15%] h-full xl:mt-0 items-center rounded-md bg-[#d9534f] hover:scale-105 transition-all duration-300 ease-in-out py-2 text-sm lg:text-base text-white hover:opacity-90 hover:text-gray-300 shadow-sm focus:relative"
                                                        onClick={() => openPopup(student._id)}
                                                    >
                                                        Remove
                                                        {/* {showLoading ? <Spinner /> : 'Remove'} */}
                                                    </button>
                                                ) : (
                                                    <button
                                                        className=" h-full bg-[#198754]  hover:scale-105 transition-all duration-300 ease-in-out text-white inline-flex items-center gap-2 rounded-md px-[15%] py-2 lg:text-base text-sm hover:opacity-90 hover:text-gray-300 focus:relative"
                                                        //   onClick={() => handleStatusUpdate(faculty.courseReqId, 'accepted')}
                                                        onClick={() => openIsUpload(student._id)}

                                                    >
                                                        Register
                                                        {/* {showLoading ? <Spinner /> : 'Register'} */}
                                                    </button>
                                                )}
                                            </div>
                                            {isUpload && (
                                                <div
                                                    className=" fixed inset-0 flex items-center justify-center z-50"
                                                    onClick={closeIsUpload}
                                                >
                                                    {toastMessages.map((toast, index) => (
                                                        <Toast
                                                            className="mb-0"
                                                            key={index}
                                                            toasts={[toast]}
                                                            onClose={() => {
                                                                const updatedToasts = [...toastMessages];
                                                                updatedToasts.splice(index, 1);
                                                                setToastMessages(updatedToasts);
                                                            }}
                                                        />
                                                    ))}
                                                    <div className=" bg-black opacity-50 absolute inset-0"></div>
                                                    <div
                                                        className=" bg-white rounded-3xl md:w-[40rem] w-80  p-8 px-12 relative z-10"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <h2 className="text-sa-maroon text-xl md:text-2xl  font-semibold md:w-auto w-60 text-left mb-4">
                                                            Face Registration
                                                        </h2>
                                                        <p className="text-black font-bold mb-4 text-filter-heading md:w-auto w-60 text-left">
                                                            Upload video for face registeration:
                                                        </p>
                                                        <div class="relative mb-6 ">
                                                            <input
                                                                type="file"
                                                                accept="video/*"
                                                                className="shadow-xl cursor-pointer focus:outline-none focus:ring-0 focus:border-clue-purchase peer m-0 block h-[60px] md:h-[60px] md:mr-44 md:w-[102%] w-[245px] rounded-[14px] border-[1px] border-solid border-black bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black"
                                                                id="videoUpload"
                                                                onChange={handleVideoUpload}
                                                            />

                                                        </div>
                                                        <div className="flex justify-end mt-6">
                                                            <button
                                                                onClick={closeIsUpload}
                                                                className="text-filter-heading md:text-base hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-2 px-4 md:px-4"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className="bg-sa-maroon md:text-base hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-8 px-7 rounded-[9px] py-2 "
                                                                onClick={uploadVideo}
                                                            >
                                                                {uploadShowLoading ? <Spinner /> : <span>Upload</span>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </td>
                                        <td className="p-0 py-5 border-sa-grey">
                                            <span
                                                className={`block text-base w-full h-full overflow-hidden overflow-ellipsis font-semibold ${student.registered_face === false ? 'text-red-600' : 'text-green-600'
                                                    }`}
                                                style={{ wordWrap: "break-word" }}
                                            >
                                                {student.registered_face === false ? 'Unregistered' : 'Registered'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {isPopupOpen && (
                                    <div
                                        className=" fixed inset-0 flex items-center justify-center z-50"
                                        onClick={closePopup}
                                    >
                                        <div className=" bg-black opacity-50 absolute inset-0"></div>
                                        <div
                                            className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <h2 className="text-black font-bold text-xl md:w-auto w-60 text-left mb-4">
                                                Confirm
                                            </h2>
                                            <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                                                Are you sure you want to remove facial registeration of this student?
                                            </p>
                                            <div className="flex justify-end mt-6">
                                                <button
                                                    onClick={closePopup}
                                                    className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out   hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                                                >
                                                    Cancel
                                                </button>
                                                <button className="bg-[#d9534f]  hover:scale-105 transition-all duration-300 ease-in-out  hover:opacity-70 text-white min-w-28 rounded-[9px] py-3 md:py-2 "
                                                    onClick={() => handleRemove()}
                                                >
                                                        {removeShowloading ? <Spinner size="h-6 w-6"/> : 'Remove'}

                                                    
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <tr className="border-b-0">
                                    <td className="md:py-16 py-16 border-r border-sa-grey w-[100px]"></td>
                                    <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                                    <td className="md:py-16 py-16  border-sa-grey"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {uploading && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 w-[20%] rounded-lg">
                        <p className="font-bold">Uploading...</p>
                        <div className="w-full h-4 bg-gray-200 rounded-lg mt-2">
                            <div
                                className="h-full bg-sa-maroon rounded-lg"
                                style={{ width: `${uploadProgress}%` }} // Dynamically adjust width based on uploadProgress
                            ></div>
                        </div>
                        <p className="text-center mt-2 font-bold">{uploadProgress}%</p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default FacialRegAdboard;

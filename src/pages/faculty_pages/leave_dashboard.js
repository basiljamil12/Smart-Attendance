import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FacultyNavbar from "../../components/navbars/faculty_navbar";
import GetLeaveManager from "../../models/faculty/leave/http/get_leave";
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
import GetLeaveIdManager from "../../models/faculty/leave/http/get_leave_id";
import UpdateLeaveManager from "../../models/faculty/leave/http/update_leave";
function FacultyLeaveDashboard() {
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState([]); //
  const [leaveApprovalData, setLeaveApprovalData] = useState([]);
  const [isDetails, setIsDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  const getLeaveManager = new GetLeaveManager();
  const getLeaveIdManager = new GetLeaveIdManager();
  const updateLeaveManager = new UpdateLeaveManager();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setShowLoading(true);
    try {
      const response = await getLeaveManager.getAll();
      if (response.success) {
        setLeaveApprovalData(response.data);
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
  const convertDateFormat = (startDate) => {
    const parsedDate = new Date(startDate);

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedStartDate = parsedDate.toLocaleDateString("en-US", options);
    return formattedStartDate;
  };

  const navigate = useNavigate();

  const handleDetails = async (index) => {
    const _id = leaveApprovalData[index]._id;
    setIsDetails(true);
    setDetailsLoading(true);
    try {
      const response = await getLeaveIdManager.get(_id);
      if (response.success) {
        setLeaveDetails(response.data);
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
      setDetailsLoading(false);
    }
  };

  const closeDetails = () => {
    setIsDetails(false);
  };

  const handleUpdate = async (status) => {
    const _id = leaveDetails._id;
    if (status == "accepted") {
      setAcceptLoading(true);
    }
    if (status == "rejected") {
      setRejectLoading(true);
    }
    try {
      const response = await updateLeaveManager.update(_id, status);
      if (response.success) {
        fetchData();
        if (status == "accepted") {
          setAcceptLoading(false);
          
        }
        if (status == "rejected") {
          setRejectLoading(false);
         
        }
        setIsDetails(false);
        setToastMessages([
          ...toastMessages,
          {
            type: "success",
            title: "Success",
            body: response.message,
          },
        ]);
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
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleDownload = () => {
    const base64String = leaveDetails.attachment;
    const binaryString = atob(base64String);

    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: "application/octet-stream" });
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.href = window.URL.createObjectURL(blob);
    a.download = `${
      leaveDetails.studentId && leaveDetails.studentId.name
    }_leave.pdf`;
    a.click();

    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
  };

  return (
    <div className="flex-col">
      <div>
        <FacultyNavbar />
      </div>
      {showLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}
      <div className="w-full">
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
        <div className="md:mt-14 mt-10">
          <div className="flex justify-between mx-10 md:mx-24">
            <span className="text-sa-maroon font-bold text-[28px] md:text-[36px]">
              Leave Approval Dashboard
            </span>
          </div>
          {!showLoading && (
          <div className="mb-20 overflow-x-auto mt-10 mx-10 md:ml-[6%] md:w-[90%] md:shadow-xl rounded-2xl ">
            <table className="table-fixed min-w-full bg-sa-pink w-[800px] md:w-[50vw] rounded-2xl">
              <thead>
                <tr className="border-b border-sa-grey">
                  <th className="p-0 py-5  border-r border-sa-grey w-[100px]">
                    #
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    Student Name
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">Subject</th>
                  <th className="p-0 py-5  border-r border-sa-grey">
                    From Date
                  </th>
                  <th className="p-0 py-5  border-r border-sa-grey">To Date</th>
                  <th className="p-0 py-5  border-r border-sa-grey">Details</th>
                  <th className="p-0 py-5  border-sa-grey">Status</th>
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
                        {faculty.studentId.name}
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
                        {convertDateFormat(faculty.fromDate)}
                      </span>
                    </td>
                    <td className="p-0 py-5  border-r border-sa-grey">
                      <span
                        className="block w-full h-full overflow-hidden overflow-ellipsis"
                        style={{ wordWrap: "break-word" }}
                      >
                        {convertDateFormat(faculty.toDate)}
                      </span>
                    </td>
                    <td className="p-2 py-5  border-r  border-sa-grey">
                      <div class="lg:inline-flex rounded-lg border  bg-sa-pink p-1">
                        <button
                          class="bg-sa-maroon  text-white inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300  focus:relative"
                          onClick={() => handleDetails(index)}
                        >
                          View Details
                        </button>
                      </div>
                    </td>

                    <td className="p-0 py-5 border-sa-grey">
                      <span
                        className={`block font-bold w-full h-full overflow-hidden overflow-ellipsis ${
                          faculty.status === "accepted"
                            ? "text-green-600"
                            : faculty.status === "rejected"
                            ? "text-red-600"
                            : faculty.status === "pending"
                            ? "text-sa-blue"
                            : ""
                        }`}
                        style={{ wordWrap: "break-word" }}
                      >
                        {capitalizeFirstLetter(faculty.status)}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="border-b-0">
                  <td className="md:py-16 py-16 border-r border-sa-grey w-[100px]"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                  <td className="md:py-16 py-16 border-r border-sa-grey"></td>
                </tr>
              </tbody>
            </table>
          </div>)}
        </div>
      </div>
      {isDetails && (
        <div
          className=" fixed inset-0 flex items-center justify-center z-50"
          onClick={closeDetails}
        >
          <div className=" bg-black opacity-50 absolute inset-0"></div>
          {detailsLoading ? (
            <div
              className="bg-white rounded-3xl md:w-[80%] w-[90%] p-8 md:px-12 relative z-10 h-auto max-h-[75vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Spinner />
            </div>
          ) : (
            <div
              className="bg-white rounded-3xl md:w-[80%] w-[90%] p-8 md:px-12 relative z-10 h-auto max-h-[75vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:mb-5 mb-10">
                <span className="text-sa-maroon font-bold text-2xl md:text-3xl">
                  Leave Request
                </span>
              </div>
              <div className="flex items-start my-2 text-lg ">
                <span className="text-sa-maroon font-bold">Student Name: </span>
                <span className="ml-1">
                  {leaveDetails.studentId && leaveDetails.studentId.name}
                </span>
              </div>
              <div className="flex items-start my-2 text-lg">
                <span className="text-sa-maroon font-bold">Subject:</span>
                <span className="ml-1">{leaveDetails.subject}</span>
              </div>
              <div className="flex items-start my-2 text-lg">
                <span className="text-sa-maroon font-bold">From Date: </span>
                <span className="ml-1">
                  {convertDateFormat(leaveDetails.fromDate)}
                </span>
              </div>
              <div className="flex items-start my-2 text-lg">
                <span className="text-sa-maroon font-bold">To Date: </span>
                <span className="ml-1">
                  {convertDateFormat(leaveDetails.toDate)}
                </span>
              </div>
              <div className="flex items-start my-2 text-lg">
                <span className="text-sa-maroon font-bold">Status: </span>
                <span
                  className={`ml-1 font-semibold ${
                    leaveDetails.status === "accepted"
                      ? "text-green-600"
                      : leaveDetails.status === "rejected"
                      ? "text-red-600"
                      : leaveDetails.status === "pending"
                      ? "text-sa-blue"
                      : ""
                  }`}
                >
                  {capitalizeFirstLetter(leaveDetails.status)}
                </span>
              </div>
              <div className="flex items-start my-2 text-lg">
                <span
                  className={`text-sa-maroon font-bold ${
                    leaveDetails.attachment ? "md:mt-1" : "md:mt-0"
                  } mt-4`}
                >
                  Attachment:{" "}
                </span>
                {leaveDetails.attachment ? (
                  <button
                    className="bg-sa-maroon md:ml-2 ml-3 text-white inline-flex items-center gap-2 rounded-3xl px-4 py-2 text-sm hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300 focus:relative"
                    onClick={handleDownload}
                    id="downloadButton"
                  >
                    Download Attachment
                  </button>
                ) : (
                  <span className="ml-1 text-lg">N/A</span>
                )}
              </div>
              <div className="flex items-start my-2 text-lg">
                <span className="text-sa-maroon font-bold">Reason: </span>
              </div>
              <div className="text-left">
                <span>{leaveDetails.reason}</span>
              </div>
              <div className="mt-10 w-full flex-col md:flex-row md:justify-center">
                {leaveDetails.status != "accepted" && (
                  <button
                    class="bg-sa-approve text-white items-center md:w-40 w-60 h-12 rounded-3xl md:mx-1 md:px-4 py-2 text-base  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300  focus:relative"
                    onClick={() => handleUpdate("accepted")}
                  >
                    {acceptLoading ? <Spinner /> : "Approve"}
                  </button>
                )}
                <br className="md:hidden inline"></br>
                {leaveDetails.status != "rejected" && (
                  <button
                    class="bg-sa-reject text-white md:w-40 w-60 h-12 items-center gap-2 rounded-3xl  md:mt-0 mt-3 md:mx-1 md:px-4 py-2 text-base  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300  focus:relative"
                    onClick={() => handleUpdate("rejected")}
                  >
                    {rejectLoading ? <Spinner /> : "Reject"}
                  </button>
                )}

                <br className="md:hidden inline"></br>
                <button
                  class="bg-sa-close text-white md:w-40 w-60 h-12 items-center gap-2 rounded-3xl  md:mt-0 mt-3 mx-1 md:mx-1 md:px-4 py-2 text-base  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300  focus:relative"
                  onClick={closeDetails}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FacultyLeaveDashboard;

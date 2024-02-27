import StudentNavbar from "../../components/navbars/student_navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import Toast from "../../components/toast/toast";
import CreateLeaveManager from "../../models/student/leave/http/create_leave";
import Spinner from "../../components/spinner/spinner";

function ApplyLeave() {
  const navigate = useNavigate();
  const leaveManager = new CreateLeaveManager();
  const [showLoading, setShowLoading] = useState(false);

  const [startDate1, setStartDate] = useState();
  const [endDate1, setEndDate] = useState();

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e) => {
    setEndDate(e.target.value);
  };

  const [startDate1Empty, setstartDate1Empty] = useState(false);
  const [endDate1Empty, setendDate1Empty] = useState(false);
  const [subject, setSubject] = useState("");
  const [subject1, setSubject1Empty] = useState(false);
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState("");
  const [reason1, setReason1Empty] = useState(false);
  const [attachment1, setAttachment1Empty] = useState("");
  const [toastMessages, setToastMessages] = useState([]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = async () => {
    if (!subject.trim()) {
      // If subject is empty or contains only whitespace
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Subject",
          body: "Subject cannot be empty",
        },
      ]);
      return; // Prevent form submission
    }
    if (!startDate1 || !endDate1) {
      // If either start or end date is empty
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Date",
          body: "Both start and end dates are required",
        },
      ]);
      return; // Prevent form submission
    }
    if (new Date(startDate1) > new Date(endDate1)) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Date Range",
          body: "End date cannot be earlier than start date",
        },
      ]);
      return; // Prevent form submission
    }
    if (!reason.trim()) {
      // If subject is empty or contains only whitespace
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Invalid Reason",
          body: "Reason cannot be empty",
        },
      ]);
      return; // Prevent form submission
    }
    try {
      setShowLoading(true);
      const response = await leaveManager.create(
        subject,
        startDate1,
        endDate1,
        attachment,
        reason
      );

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
        navigate("/student/leave/dashboard", {
          state: { toastMessages: updatedToastMessages },
        });
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
    } catch (response) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: response.message,
        },
      ]);
    } finally {
      setShowLoading(false); // Stop loading
    }
  };
  function updateFileName(event) {
    const files = event.target.files;
    let fileNames = "";

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setAttachment(file);
        const fileName = file.name;
        const allowedExtensions = [".pdf"];
        const extension = fileName.substring(fileName.lastIndexOf("."));

        if (allowedExtensions.includes(extension)) {
          fileNames += fileName;
          if (i !== files.length - 1) {
            fileNames += ", ";
          }
        } else {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Invalid File",
              body: "Only .pdf files are allowed",
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
    }
  }

  return (
    <div>
      <div>
        <StudentNavbar />
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
      <div className="md:ml-14 ml-5 mx-[6%] ">
        <p className="text-sa-maroon text-[36px] text-left md:mt-8 mt-6 font-bold">
          Apply Leave
        </p>
        <div className="md:ml-3 ml-2 mt-5 md:mt-4 mb-5 ">
          <label
            className="text-sa-black block text-left  text-[20px] font-[600] mb-2 text-filter-heading"
            htmlFor="link"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Subject..."
            onChange={handleSubjectChange}
            value={subject}
            className={`placeholder-gray-500 w-full  h-14 md:h-16 py-4  border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
              subject1
                ? "border-red-500"
                : "border-[1px] border-black border-solid "
            }`}
          />
        </div>
        <div className=" md:ml-0 ml-2 flex flex-col md:flex-row">
          <div className="w-full mb-5 md:ml-3  md:mr-[2%] md:mx-0 ">
            <label
              className="text-sa-black block text-left mb-1 text-[20px] font-[600] text-filter-heading"
              htmlForcardNumber1=""
            >
              From
            </label>
            <div className="flex">
              <input
                type="date"
                value={startDate1}
                onChange={handleStartChange}
                id="startDate"
                className={`w-full hover:cursor-pointer  h-14 md:h-16 py-4 text-filter-heading bg-clue-black p-2 rounded-[10px] border-[1px] border-black border-solid focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
                  startDate1Empty
                    ? "border-red-500"
                    : "border-[1px] border-black border-solid"
                }`}
              />
            </div>
          </div>
          <div className="w-full mb-3 md:ml-0  ">
            <label
              className=" text-sa-black block text-left mb-1 text-[20px] font-[600] text-filter-heading"
              htmlFor="cardNumber1"
            >
              To
            </label>
            <div className="flex">
              <input
                type="date"
                value={endDate1}
                onChange={handleEndChange}
                id="endDate"
                className={`w-full hover:cursor-pointer  h-14 md:h-16 py-4 text-filter-heading bg-clue-black p-2 rounded-[10px] border-[1px] border-black border-solid focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
                  endDate1Empty
                    ? "border-red-500"
                    : "border-[1px] border-black border-solid "
                }`}
              />
            </div>
          </div>
        </div>
        <div className="md:ml-3 ml-2 md:mb-5 mb-6 ">
          <label
            className="text-sa-black block text-left  text-[20px] font-[600] mb-2 text-filter-heading"
            htmlFor="link"
          >
            Attachements (Optional)
          </label>
          <div className="flex justify-between  mt-2 italic mb-2 font-semibold text-red-600">
  *Note: Add all the proofs in 1 pdf file *
</div>
          <form>
            <div className="relative md:mb-5 mb-6">
              <input
                type="search"
                id="attachements"
                className="placeholder-gray-500  placeholder:md:text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon h-14 md:h-16 py-4 block w-full p-4 border border-black border-solid text-black rounded-xl bg-white focus:ring-blue-500"
                placeholder="No File Choosen (.pdf)"
                required
                disabled
              />
              <label
                htmlFor="fileInput"
                className="md:text-base text-sm transition-opacity hover:opacity-90 md:mr-3 text-white absolute end-2.5 bottom-2.5 bg-sa-maroon focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 md:py-2.5 py-2  cursor-pointer"
              >
                Choose File
                <input
                  type="file"
                  //multiple
                  id="fileInput"
                  accept=".pdf"
                  className="hidden"
                  onChange={updateFileName}
                />
              </label>
            </div>
          </form>
        </div>
        <div className="md:ml-3 ml-2 md:mb-6 mb-10 ">
          <label
            className="text-sa-black block text-left  text-[20px] font-[600] mb-2 text-filter-heading"
            htmlFor="link"
          >
            Reason
          </label>
          <textarea
            id="reason"
            placeholder="Reason..."
            onChange={handleReasonChange}
            value={reason}
            className={`placeholder-gray-500 w-full md:h-44 h-40 resize-none border-[1px] border-black border-solid text-black bg-clue-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:focus:border-sa-maroon ${
              reason1
                ? "border-red-500"
                : "border-[1px] border-black border-solid "
            }`}
          />
        </div>
        <div class="flex items-center justify-center mb-14   ">
          <button
            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
            class=" hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[55px] md:h-[56px]  md:w-[280px] w-[220px]  rounded-[20px]   bg-clip-padding px-3 py-2  leading-tight text-white text-[20px] md:text-[24px]"
            onClick={handleSubmit}
          >
            {showLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;

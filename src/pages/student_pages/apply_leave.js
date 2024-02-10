import StudentNavbar from "../../components/navbars/student_navbar";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";

function ApplyLeave() {

  const navigate = useNavigate();

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

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    // Check if the selected file is not one of the allowed types
    if (file && !allowedTypes.includes(file.type)) {
      alert("Only JPEG, JPG, and PNG files are allowed.");
      event.target.value = ""; // Clear the input field
      return;
    }

    // Handle file change...
  };

  const handleSubmit = () => {
    navigate("/student/dashboard");
  };

  return (
    <div>
      <div>
        <StudentNavbar />
      </div>
      <div className="md:ml-14 ml-5 mx-[6%] ">
        <p className="text-sa-maroon text-[36px] text-left md:mt-10 mt-6 font-bold">
          Apply Leave
        </p>
        <div className="md:ml-3 ml-2 mt-5 md:mt-6 mb-5 ">
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
            className={`placeholder-gray-500 w-full   border-[1px] border-black border-solid   text-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
              subject1
                ? "border-red-500"
                : "border-[1px] border-black border-solid "
            }`}
          />
        </div>
        <div className=" mb-3 md:ml-0 ml-2 flex flex-col md:flex-row">
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
                className={`w-full hover:cursor-pointer text-filter-heading bg-clue-black p-2 rounded-[10px] border-[1px] border-black border-solid focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
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
                className={`w-full hover:cursor-pointer text-filter-heading bg-clue-black p-2 rounded-[10px] border-[1px] border-black border-solid focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon ${
                  endDate1Empty
                    ? "border-red-500"
                    : "border-[1px] border-black border-solid "
                }`}
              />
            </div>
          </div>
        </div>
        <div className="md:ml-3 ml-2 md:mb-7 mb-6 ">
          <label
            className="text-sa-black block text-left  text-[20px] font-[600] mb-2 text-filter-heading"
            htmlFor="link"
          >
            Attachement (Optional)
          </label>
          {/* <input
    id="attachment"
    placeholder="Optional..."
    onChange={handleAttachmentChange}
    value={attachment}
    type="file"
    accept=".jpeg, .jpg, .png"
    className={`placeholder-gray-500 w-full border-[1px] border-black border-solid text-black bg-clue-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-clue-purchase ${attachment1
        ? "border-red-500"
        : "border-[1px] border-black border-solid "
    }`}
/> */}

          <input
            id="attachment"
            placeholder="Optional..."
            onChange={handleAttachmentChange}
            type="file"
            className={`placeholder-gray-500  w-full border-[1px] border-black border-solid text-black bg-clue-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:border-sa-maroon`}
          />
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
            className={`placeholder-gray-500 w-full md:h-52 h-40 resize-none border-[1px] border-black border-solid text-black bg-clue-black p-2 rounded-xl focus:outline-none focus:ring-0 focus:border focus:focus:border-sa-maroon ${
              reason1
                ? "border-red-500"
                : "border-[1px] border-black border-solid "
            }`}
          />
        </div>
        <div class="flex items-center justify-center mb-14   ">
          <button
            //className="mb-4 h-[45px] md:h-[56px] bg-sa-maroon rounded-[20px] md:w-[102%] w-[245px] md:mr-3  shadow-md mx-5 text-white font-bold text-[26px]"
            class=" transition-opacity hover:opacity-90 font-bold shadow-xl focus:outline-none focus:ring-0 bg-sa-maroon  focus:border-sa-maroon peer m-0 block h-[45px] md:h-[56px]  md:w-[280px] w-[220px]  rounded-[20px]   bg-clip-padding px-3 py-2 text-base  leading-tight text-white text-[20px] md:text-[24px]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyLeave;

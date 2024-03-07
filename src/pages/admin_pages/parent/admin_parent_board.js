import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/sidebar";
import { useNavigate } from "react-router";

import ParentManager from "../../../models/admin/parent/http/get_all_parent";
import Toast from "../../../components/toast/toast";
import Spinner from "../../../components/spinner/spinner";
import DeleteParentManager from "../../../models/admin/parent/http/delete_parent";
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

function ParentAdboard() {
  const parentManager = new ParentManager();
  const deleteManager = new DeleteParentManager();
  const location = useLocation(); 
  const [parentData, setParentData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [deleteShowLoading, setDeleteShowLoading] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);
  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state

  const navigate = useNavigate();

  useEffect(() => {
    getAllParent();
  }, []);

  const getAllParent = () => {
    setShowLoading(true);
    parentManager.getAll().then((value) => {
      if (value == null) {
      } else if (!value.error) {
        const baseResponse = value.success;
        if (baseResponse == true) {
          setParentData(value.data);
          console.log(baseResponse);
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

  const goToAddParent = () => {
    navigate("/adboard/parent/add");
  };
  const [isDelete, setIsDelete] = useState(false);

  const closeIsDelete = () => {
    setIsDelete(false);
  };
  const openIsDelete = (id) => {
    setDeleteIdx(id);
    setIsDelete(true);
  };

  const handleDelete = () => {
    setDeleteShowLoading(true);
    const id = parentData[deleteIdx]._id;
    deleteManager.delete(id).then((value) => {
      if (value == null) {
      } else if (!value.error) {
        const baseResponse = value.success;
        if (baseResponse == true) {
          getAllParent();
          closeIsDelete();
          setToastMessages([
            ...toastMessages,
            {
              type: "success",
              title: "Faculty Deleted",
              body: value.message,
            },
          ]);
          setDeleteShowLoading(false);
        } else {
          setDeleteShowLoading(false);
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
        setDeleteShowLoading(false);
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

  const handleNavigate = (idx) => {
    const id = parentData[idx]._id;
    navigate("/adboard/parent/edit?id=" + id);
  };

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
      {showLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="w-full">
          <div className="md:mt-8 md:ml-8 mt-16 md:flex md:items-start md:justify-start">
            <span className="text-sa-maroon  font-bold text-2xl md:text-3xl">
              Parent Dashboard
            </span>
          </div>
          <div className="md:mt-14 mt-10">
            <div className="flex justify-between xl:mx-16 mx-10">
              <span className="text-sa-maroon font-bold md:mt-0 mt-2 text-2xl md:text-2xl">
                Parent List
              </span>
              <Button
               onClick={goToAddParent}
    variant="contained"
    startIcon={<AddBoxIcon />}
    sx={{
      backgroundColor: '#925454',
        cursor: 'pointer',
        color: 'white',
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '6px',
        padding: '10px 14px',
        fontSize: '16px',
        '&:hover': {
            opacity: 0.9,
            transform: 'scale(1.05)',
            backgroundColor: '#925454',
        },
        transition: 'all 300ms ease-in-out',
    }}
>
    Add Parent
</Button>
              {/* <button
                //className="transition-opacity hover:opacity-85 text-sa-maroon font-bold text-lg pt-0.5 underline hover:cursor-pointer"
                className="bg-sa-maroon cursor-pointer text-white inline-flex items-center gap-2 rounded-md lg:px-6 px-3 py-2 text-md hover:opacity-90 hover:scale-105 transition-all duration-300 ease-in-out hover:text-gray-300 focus:relative"
                
                onClick={goToAddParent}
              >
                Add Parent
              </button> */}
            </div>
            <div className="mb-20 overflow-x-auto mt-10 mx-10 lg:ml-[6%] lg:w-[90%] lg:shadow-xl rounded-2xl">
              <table className="table-fixed min-w-full bg-sa-pink w-[800px] lg:w-[70vw] rounded-2xl">
                <thead>
                  <tr className="border-b border-sa-grey">
                    <th className="p-0 py-5  border-r border-sa-grey w-[100px]">
                      #
                    </th>
                    <th className="p-0 py-5  border-r border-sa-grey">
                      Parent Name
                    </th>
                    <th className="p-0 py-5  border-r border-sa-grey">
                      Parent Email
                    </th>
                    <th className="p-0 py-5  border-r border-sa-grey">
                      Parent Contact No.
                    </th>
                    <th className="p-0 py-5  border-r border-sa-grey">
                      Student Name
                    </th>
                    <th className="p-2 py-5  border-sa-grey">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {parentData.map((parent, index) => (
                    <tr key={index} className="border-b border-sa-grey">
                      <td className="p-0 py-5  border-r border-sa-grey w-[100px]">
                        {index + 1}
                      </td>
                      <td className="p-0 py-5  border-r border-sa-grey">
                        <span
                          className="block w-full h-full overflow-hidden overflow-ellipsis"
                          style={{ wordWrap: "break-word" }}
                        >
                          {parent.name}
                        </span>
                      </td>
                      <td className="p-0 py-5  border-r border-sa-grey">
                        <span
                          className="block mx-2 h-full overflow-hidden overflow-ellipsis"
                          style={{ wordWrap: "break-word" }}
                        >
                          {parent.email}
                        </span>
                      </td>
                      <td className="p-0 py-5  border-r border-sa-grey">
                        <span
                          className="block w-full h-full overflow-hidden overflow-ellipsis"
                          style={{ wordWrap: "break-word" }}
                        >
                          {parent.contactno}
                        </span>
                      </td>
                      <td className="p-0 py-5 border-r border-sa-grey">
                        {parent.studentID && (
                          <span
                            className="block w-full h-full overflow-hidden overflow-ellipsis"
                            style={{ wordWrap: "break-word" }}
                          >
                            {parent.studentID.name}
                          </span>
                        )}
                      </td>
                        <td className="xl:inline-flex items-center justify-center w-full h-full  overflow-hidden overflow-ellipsis p-2 py-5  border-sa-grey">
                        <div class=" rounded-lg border  bg-sa-pink p-1">
                          <button 
                          //class="bg-sa-maroon md:mr-2 hover:scale-105 transition-all duration-300 ease-in-out text-white inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm   hover:opacity-90 hover:text-gray-300  focus:relative" 
       // className=" lg:w-[55%] w-[88px]    h-full bg-sa-maroon xl:ml-2 text-white  items-center gap-2 rounded-md py-2 lg:text-base text-sm hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 hover:text-gray-300 focus:relative"
       className=" xl:w-24 lg:w-[6rem]    h-full bg-sa-maroon xl:ml-0 hover:scale-105 transition-all duration-300 ease-in-out text-white inline-flex items-center gap-2 rounded-md px-4 py-2 lg:text-base text-sm  hover:opacity-90 hover:text-gray-300 focus:relative"
                          
                          onClick={() => handleNavigate(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-4 w-4"

                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                            Edit
                          </button>

                          <button 
    className="xl:w-28 lg:w-[7rem] xl:ml-2 hover:scale-105 transition-all duration-300 ease-in-out  h-full inline-flex xl:mt-4 mt-4 items-center  rounded-md bg-[#d9534f] px-4 py-2 lg:text-base text-sm text-white  hover:opacity-90 hover:text-gray-300 shadow-sm focus:relative"
    onClick={() => openIsDelete(index)}
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4 mr-2"
    >
        <path
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
    </svg>
    Delete
</button>

                        </div>
                        {/* <span className="text-sa-maroon text-md underline mx-2 hover:cursor-pointer">
                      Edit
                    </span>
                    <span>|</span>
                    <span className="text-sa-maroon text-md underline mx-2 hover:cursor-pointer">
                      Delete
                    </span> */}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b-0">
                    <td className="md:py-28 py-16 border-r border-sa-grey w-[100px]"></td>
                    <td className="md:py-28 py-16 border-r border-sa-grey"></td>
                    <td className="md:py-28 py-16 border-r border-sa-grey"></td>
                    <td className="md:py-28 py-16 border-r border-sa-grey"></td>
                    <td className="md:py-28 py-16 border-r border-sa-grey"></td>
                    <td className="md:py-28 py-16  border-sa-grey"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {isDelete && (
        <div
          className=" fixed inset-0 flex items-center justify-center z-50"
          onClick={closeIsDelete}
        >
          <div className=" bg-black opacity-50 absolute inset-0"></div>
          <div
            className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-black font-semibold md:w-auto w-60 text-left mb-4">
              Confirm
            </h2>
            <p className="text-black text-filter-heading md:w-auto w-60 text-left">
              Are you sure you want to delete this parent?
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeIsDelete}
                className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
              >
                Cancel
              </button>
              <button
                className="bg-sa-maroon hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-7 px-5 rounded-[9px] py-1 "
                onClick={handleDelete}
              >
                {deleteShowLoading ? <Spinner /> : <span>Delete</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentAdboard;

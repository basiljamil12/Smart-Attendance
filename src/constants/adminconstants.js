const BASE_URL = "http://localhost:3000/api/v1/";

const ApiConstants = {
  SIGN_IN: `${BASE_URL}admin/sign-in`,
  SIGN_OUT: `${BASE_URL}admin/sign-out`,
  GET_ALL_FACULTY: `${BASE_URL}faculty/alldetails`,
  GET_ALL_PARENT: `${BASE_URL}parent/alldetails`,
  GET_ALL_STUDENT: `${BASE_URL}student/alldetails`,
  GET_ALL_COURSE: `${BASE_URL}course/alldetails`,
  CREATE_COURSE: `${BASE_URL}course/create`,
  CREATE_FACULTY: `${BASE_URL}faculty/create`,
  CREATE_STUDENT: `${BASE_URL}student/create`,
  CREATE_PARENT: `${BASE_URL}parent/create`,
  DELETE_FACULTY: `${BASE_URL}faculty/delete?_id=`,
  DELETE_PARENT: `${BASE_URL}parent/delete?_id=`,
  DELETE_STUDENT: `${BASE_URL}student/delete?_id=`,
  DELETE_COURSE: `${BASE_URL}course/delete?_id=`,
  EDIT_FACULTY: `${BASE_URL}faculty/edit/details?_id=`,
  GET_FACULTY: `${BASE_URL}faculty/detailsbyid?_id=`,
  EDIT_PARENT: `${BASE_URL}parent/edit/details?_id=`,
  GET_PARENT: `${BASE_URL}parent/detailsbyid?_id=`,
  EDIT_STUDENT: `${BASE_URL}student/edit/details?_id=`,
  GET_STUDENT: `${BASE_URL}student/detailsbyid?_id=`,
  EDIT_COURSE: `${BASE_URL}course/update?_id=`,
  GET_COURSE: `${BASE_URL}course/details?_id=`,
  EDIT_FACULTY_PASSWORD: `${BASE_URL}faculty/updatebyid/password?_id=`,
  EDIT_PARENT_PASSWORD: `${BASE_URL}parent/updatebyid/password?_id=`,
  EDIT_STUDENT_PASSWORD: `${BASE_URL}student/updatebyid/password?_id=`,
  CREATE_LEAVE: `${BASE_URL}leave/create`,
};

export default ApiConstants;

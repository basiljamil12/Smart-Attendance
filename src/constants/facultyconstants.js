//const BASE_URL = "http://ec2-13-210-17-40.ap-southeast-2.compute.amazonaws.com/api/v1/";
//const BASE_URL = "https://3.106.228.196/api/v1/";
//const BASE_URL = "https://13.211.10.201/api/v1/";
//const BASE_URL = "http://3.24.90.211/api/v1/";
// const BASE_URL = "https://api.cluebycandlelight.com/api/v1/";
const BASE_URL = "http://localhost:3000/api/v1/";

const facultyApiConstants = {
  SIGN_IN: `${BASE_URL}faculty/sign-in`,
  SIGN_OUT: `${BASE_URL}faculty/sign-out`,
  FORGOT_PASS: `${BASE_URL}faculty/forgot-password`,
  VALIDATE_TOKEN:`${BASE_URL}faculty/validate-reset-pass-token`,
  RESET_PASS:`${BASE_URL}faculty/reset-password`,
  GET_DETAILS: `${BASE_URL}faculty/details`,
  GET_LEAVE_DETAILS: `${BASE_URL}leave/alldetails`,
  CHANGE_PASSWORD:`${BASE_URL}/faculty/update/password`,
  GET_LEAVE_ID: `${BASE_URL}leave/details?_id=`,
  UPDATE_LEAVE_STATUS: `${BASE_URL}leave/update?_id=`,
  ASSIGN_COURSE: `${BASE_URL}course/update-by-advisor?_id=`,
};

export default facultyApiConstants;
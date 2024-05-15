//const BASE_URL = "http://ec2-13-210-17-40.ap-southeast-2.compute.amazonaws.com/api/v1/";
//const BASE_URL = "https://3.106.228.196/api/v1/";
//const BASE_URL = "https://13.211.10.201/api/v1/";
//const BASE_URL = "http://3.24.90.211/api/v1/";
// const BASE_URL = "https://api.cluebycandlelight.com/api/v1/";
const BASE_URL = "http://localhost:3000/api/v1/";

const StudentApiConstants = {
  SIGN_IN: `${BASE_URL}student/sign-in`,
  SIGN_OUT: `${BASE_URL}student/sign-out`,
  FORGOT_PASS: `${BASE_URL}student/forgot-password`,
  VALIDATE_TOKEN:`${BASE_URL}student/validate-reset-pass-token`,
  RESET_PASS:`${BASE_URL}student/reset-password`,
  GET_STUDENT_DETAILS: `${BASE_URL}student/details`,
  GET_STUDENT_LEAVE:`${BASE_URL}leave/details-by-student`,
  CHANGE_PASSWORD:`${BASE_URL}/student/update/password`,


};

export default StudentApiConstants;
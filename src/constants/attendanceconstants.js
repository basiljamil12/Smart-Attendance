//const BASE_URL = "http://ec2-13-210-17-40.ap-southeast-2.compute.amazonaws.com/api/v1/";
//const BASE_URL = "https://3.106.228.196/api/v1/";
//const BASE_URL = "https://13.211.10.201/api/v1/";
//const BASE_URL = "http://3.24.90.211/api/v1/";
// const BASE_URL = "https://api.cluebycandlelight.com/api/v1/";
const BASE_URL = "http://localhost:3000/api/v1/";

const attendanceApiConstants = {
  GET_ATT_BY_ID: `${BASE_URL}attendance/details?_id=`,
  CREATE_ATTENDANCE: `${BASE_URL}attendance/create`,
  GET_ATTENDANCE_BY_STUDENT: `${BASE_URL}course-info/details-by-student`,
  GET_ATTENDANCE_BY_COURSE_ID: `${BASE_URL}course-info/details-by-course?_id=`,
};

export default attendanceApiConstants;

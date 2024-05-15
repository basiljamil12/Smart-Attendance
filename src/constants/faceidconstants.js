const BASE_URL = "http://localhost:5000/api/v1/";
const DELETE_BASE_URL = "http://localhost:3000/api/v1/";

const FaceIdConstants = {
    CREATE_FACEID: `${BASE_URL}face-id/create`,
    DELETE_FACEID: `${DELETE_BASE_URL}face-id/delete?_id=`,
};

export default FaceIdConstants;

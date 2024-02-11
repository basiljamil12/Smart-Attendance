import ApiConstants from "../../../../constants/adminconstants.js";
import { BaseResponse } from "../compmodels/compmodel.js";

class CulpritUpdateCompManager {
  async update(
    forId,
    culprit
  ) {
    const url = ApiConstants.UPDATE_COMP + '' + forId;
    const token = localStorage.getItem("userToken");

    const formData = new FormData();
    formData.append("culprit", culprit);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          token: token,
        },
        body: formData,
      });

      if (response.status === 401) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        window.location.href = "/adboard/signin";
        return null;
      }

      if (response.ok) {
        const responseBody = await response.json();
        return new BaseResponse(responseBody);
      } else {
        const errorBody = await response.text();
        throw new Error(errorBody);
      }
    } catch (error) {
      throw new Error(error.toString());
    }
  }
}

export default CulpritUpdateCompManager;

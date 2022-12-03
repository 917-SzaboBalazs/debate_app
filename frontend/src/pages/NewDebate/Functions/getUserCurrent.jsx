import axiosInstance from "../../../axios";

function getUserCurrent(
    setCurrRole
) {
    axiosInstance
          .get('user/current/')
          .then((res) => {
              setCurrRole(res.data.role);
          })
          .catch(() => {

          })
}

export default getUserCurrent;
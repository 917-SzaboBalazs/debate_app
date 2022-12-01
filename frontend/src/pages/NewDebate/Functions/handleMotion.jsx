import axiosInstance from "../../../axios";

const handleMotion = (motion) => {
    console.log(motion);
    axiosInstance
        .patch('debate/current/', {'motion': motion })
        .then((res) => {
            console.log(res);
            }
        )
        .catch((err) => {
            console.log(err);
            }
        )

}

export default handleMotion;
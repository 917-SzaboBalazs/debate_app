import axiosInstance from "../../axios";

const handleClickTriggerCreate = (navigate) => {

    // alapertelmezetten britt parlamenti a vitafomatum
    axiosInstance
    .post('debate/create/')
    .then((res) => {
        navigate('/new-debate');
        window.location.reload(false);
      }
    )
    .catch((err) => {
        console.log(err);
        }
    )
}

export default handleClickTriggerCreate;
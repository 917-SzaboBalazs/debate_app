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
        alert('You have to be logged in for creating a debate.');
    }
    )
}

export default handleClickTriggerCreate;
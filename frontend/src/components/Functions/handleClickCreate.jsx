import axiosInstance from "../../axios";

const handleClickTriggerCreate = (navigate, setInDebate) => {

    // alapertelmezetten britt parlamenti a vitafomatum
    axiosInstance
    .post('debate/create/')
    .then((res) => {
        setInDebate(true);
        navigate('/new-debate');
      }
    )
    .catch((err) => {
        alert('You have to be logged in for creating a debate.');
    }
    )
}

export default handleClickTriggerCreate;
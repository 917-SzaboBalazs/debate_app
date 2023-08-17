import axiosInstance from "../../axios";

const handleClickTriggerCreate = (navigate, setInDebate, setStatus) => {

    // alapertelmezetten britt parlamenti a vitafomatum
    axiosInstance
    .post('debate/create/')
    .then((res) => {
        setInDebate(true);
        navigate('/new-debate');
        setStatus('/new-debate');
      }
    )
    .catch((err) => {
    }
    )
}

export default handleClickTriggerCreate;
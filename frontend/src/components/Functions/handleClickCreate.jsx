import axiosInstance from "../../axios";
import { useNavigate } from 'react-router-dom';

const handleClickTriggerCreate = (navigate) => {
    console.log('Create pressed');
    // setTriggerCreate(true);

    // alapertelmezetten britt parlamenti a vitafomatum
    axiosInstance
    .post('debate/create/')
    .then((res) => {
        navigate('/new-debate');
        window.location.reload(false);

        axiosInstance
        .patch('user/current/', {
            'role': 'spectator'
        })
        .catch((err) => {
            console.log(err);
        })
        }
    )
    .catch((err) => {
        console.log(err);
        }
    )
}

export default handleClickTriggerCreate;
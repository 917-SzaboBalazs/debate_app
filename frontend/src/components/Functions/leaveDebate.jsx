import axiosInstance from '../../axios';
import getUserCurrent from './getUserCurrent';


function leaveDebate(setUserName, setLoggedIn, setInDebate, navigate) {

    axiosInstance
    .get('user/current/')
    .then((userRes) => {
      axiosInstance
            .patch('user/current/', {"current_debate": null, 'role': null})
            .then((res) => {
            navigate('/');
            //window.location.reload(false);
            setInDebate(false);
            })
            .catch((err) => {
            })
      
    })
    .catch((err) => {
      console.log(err);
    })
}

export default leaveDebate
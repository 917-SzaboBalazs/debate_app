import axiosInstance from '../../axios';
import getUserCurrent from './getUserCurrent';


function leaveDebate(setUserName, setLoggedIn, setInDebate, navigate) {

    axiosInstance
    .get('user/current/')
    .then((userRes) => {
      axiosInstance
        .get('debate/current/')
        .then((debateRes) => {
            axiosInstance
              .patch('user/current/', {"current_debate": null, 'role': null})
              .then(() => {
                navigate('/');
                getUserCurrent(setUserName, setLoggedIn, setInDebate);
                })
              .catch((err) => {
                console.log(err);
              })
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    })
}

export default leaveDebate
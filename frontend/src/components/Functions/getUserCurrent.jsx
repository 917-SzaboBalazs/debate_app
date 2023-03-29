import axiosInstance from '../../axios';

function getUserCurrent(setUserName, setLoggedIn, setInDebate) {
    
    axiosInstance
    .get('user/current/')
    .then((res) => {
      setUserName(res.data.username);
      setLoggedIn(true);

      if (res.data.current_debate != null) {
        setInDebate(true);
      } else {
        setInDebate(false);
      }

    })
    .catch((err) => {
      console.log(err);
    });

}

export default getUserCurrent
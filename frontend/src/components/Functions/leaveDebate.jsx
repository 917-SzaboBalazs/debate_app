import axiosInstance from '../../axios';

function leaveDebate(setInDebate, setStatus, navigate) {

  axiosInstance
    .patch('user/current/', {
      "current_debate": null, 
      'role': null
    })
    .then((res) => {
      navigate('/');
      setInDebate(false);
      setStatus('');
    })
    .catch((err) => {
    })
}

export default leaveDebate;

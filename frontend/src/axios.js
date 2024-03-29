import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

//const baseURL = 'http://127.0.0.1:8000/api/';
const baseURL = 'https://debateculture.mooo.com/api/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async function(req) {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  req.headers.Authorization = accessToken ? 'JWT ' + accessToken : null;

  if (!accessToken)
  {
    return req;
  }

  const user = jwt_decode(accessToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired)
    return req;


  await axios
    .post(baseURL + "token/refresh/", {
      refresh: refreshToken
    })
    .then((res) => {
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      req.headers.Authorization = 'JWT ' + localStorage.getItem('access_token');
    })
    .catch((err) => {
      localStorage.clear('access_token');
      localStorage.clear('refresh_token');
      req.headers.Authorization = null;
    });
  
  
  

  return req;

});

export default axiosInstance;

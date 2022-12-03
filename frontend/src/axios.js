import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  withCredentials: true,
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
      axiosInstance.defaults.headers['Autorization'] =
        'JWT ' + localStorage.getItem('access_token');
    })
    .catch((err) => {
      localStorage.clear('access_token');
      localStorage.clear('refresh_token');
      axiosInstance.defaults.headers['Autorization'] = null;
    });


  return req;

});

export default axiosInstance;

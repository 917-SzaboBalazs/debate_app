import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';


function LogOut() {
    let navigate = useNavigate();

	useEffect(() => {
		// console.log('asd');

		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});


		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;

		navigate('/');
		window.location.reload(false);

	}, []);

	return (
    <>
    	<div>Logout</div>
    </>
  );
}
export default LogOut;

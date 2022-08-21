import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useHistory } from 'react-router-dom';

function LogOut() {

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
	}, []);

	return (
    <>
    <div>Logout</div>
    </>
  );
}
export default LogOut;

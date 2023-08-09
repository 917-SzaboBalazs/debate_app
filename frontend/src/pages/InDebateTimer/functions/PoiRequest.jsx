import React from 'react'
import axiosInstance from '../../../axios'

function PoiGetRequest(setPOI, setPOIseconds) {
  axiosInstance
    .get('timer/poi/')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}

export default PoiGetRequest
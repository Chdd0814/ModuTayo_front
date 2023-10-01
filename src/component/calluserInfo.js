import React, { useEffect,useState} from 'react';
import jwt_decode from "jwt-decode"; // npm install jwt-decode 하세요. 23-09-27


function calluserInfo() {
    const token = localStorage.getItem('token');

    if (token) {
        const decodeToken = jwt_decode(token);
       
        return decodeToken;
    }
return null;
}

export default calluserInfo;
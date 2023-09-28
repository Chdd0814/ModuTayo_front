import React, { useEffect,useState} from 'react';
import jwt_decode from "jwt-decode"; // npm install jwt-decode 하세요. 23-09-27


function vaildAdmin() {
    const token = localStorage.getItem('token');
    if (token) {
        const decodeToken = jwt_decode(token);
        const userAuth = decodeToken.auth;
        return userAuth === 'admin';
      } else {
      return false; // 토큰이 없는 경우 또는 역할이 없는 경우 false를 반환
      }
    }


    export default vaildAdmin;
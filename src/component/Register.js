import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Addressapi from 'react-daum-postcode';



const Register = () => {
    const navigate = useNavigate();
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [idError, setidError] = useState('');
    const [passError, setpassError] = useState('');
    const [nameError, setnameError] = useState('');
    const [tellError, settellError] = useState('');
    const [emailError, setemailError] = useState('');
    const [addressError, setaddressError] = useState('');
    const isValidId = (id) => {
                    const hasAlpha = /[a-zA-Z]/.test(id);
                    const hasNumber = /[0-9]/.test(id);
                    const isAtLeast6Chars = id.length >= 6;
                    return hasAlpha && hasNumber && isAtLeast6Chars;
                };
    const isValidPass = (pass) => {
                 const hasAlpha = /[a-zA-Z]/.test(pass);
                 const hasNumber = /[0-9]/.test(pass);
                 const isAtLeast8Chars = pass.length >= 8;
                 return hasAlpha && hasNumber && isAtLeast8Chars;
                };
    const isValidName = (name) => {
                    const regex = /^[\uAC00-\uD7A3]{1,6}$/;
                    return regex.test(name);
                };
    const isNull = (value) => {
    return value === '';
        };
        const [formData, setFormData] = useState({
            id: '',
            pass: '',
            name: '',
            phonenumber1: '',
            phonenumber2: '',
            phonenumber3: '',
            mileage: 0,
            email: '',
            address: '',
            role: 'user' // Default role
          });

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidId(formData.id)) {
                            setidError('아이디는 6글자 이상이어야 하며 영숫자가 조합되어야 합니다.');  // 유효성 검사 실패시 오류 메시지 설정
                        }
        if (!isValidPass(formData.pass)) {
                    setpassError('패스워드는 8글자 이상이어야 하며 영숫자가 조합되어야 합니다.');  // 유효성 검사 실패시 오류 메시지 설정
                }
        if(!isValidName(formData.name)){
             setnameError('이름은 한글로 1글자이상 6글자이하여야 합니다.');
        }
        if(isNull(formData.phonenumber1)||isNull(formData.phonenumber2)||   isNull(formData.phonenumber3)){
            settellError('전화번호의 값이 입력되지 않았습니다.');
        }
        if(isNull(formData.email)){
                    setemailError('이메일이 입력되지 않았습니다.');
        }
        if(isNull(formData.address)){
                            setaddressError('주소가 입력되지 않았습니다.');
                }
        try {
          await axios.post('/Register', formData);
          console.log('Register success');
          navigate("/");
        } catch (error) {
          console.error('Register error:', error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleAddressSearch = () => {
        setAddressModalOpen(true);
      };
    
      const handleAddressSelect = (data) => {
        const fullAddress = data.roadAddress || data.jibunAddress;
        const extraAddress = data.bname && /[동|로|가]$/g.test(data.bname) ? data.bname : '';
        const buildingName = data.buildingName && data.apartment === 'Y' ? data.buildingName : '';
        const finalExtraAddress = extraAddress || buildingName ? `(${extraAddress} ${buildingName})` : '';
    
        setFormData((prevData) => ({
          ...prevData,
          address: fullAddress + ' ' + finalExtraAddress,
        }));
    
        setAddressModalOpen(false);
      };

return (
    <div>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="id" placeholder="ID" onChange={handleChange} />
      <input type="password" name="pass" placeholder="Password" onChange={handleChange} />
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="text" name="phonenumber1" placeholder="Phone Number" onChange={handleChange} />
      <input type="text" name="phonenumber2" placeholder="Phone Number" onChange={handleChange} />
      <input type="text" name="phonenumber3" placeholder="Phone Number" onChange={handleChange} />
      <input type="text" name="email" placeholder="Email" onChange={handleChange} />
      <select name="email2" onChange={handleChange}>
        <option value="naver.com">naver.com</option>
        <option value="kakao.com">kakao.com</option>
        <option value="google.com">google.com</option>
      </select>
      <input type="text" name="address" placeholder="Address" value = {formData.address} onChange={handleChange} onClick = {handleAddressSearch}/>
      {idError && <div style={{ color: 'red' }}>{idError}</div>}
      {passError && <div style={{ color: 'red' }}>{passError}</div>}
      {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
      {tellError && <div style={{ color: 'red' }}>{tellError}</div>}
      {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
      {addressError && <div style={{ color: 'red' }}>{addressError}</div>}
      <button type="submit">Register</button>
      </form>

      <Addressapi
        onComplete={handleAddressSelect}
        style={{ display: isAddressModalOpen ? 'block' : 'none' }}
      />
  </div>
);
};

export default Register;
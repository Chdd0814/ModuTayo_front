import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './PasswordSearch.css';

const PasswordSearch = () => {
    const history = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                '/searchPw',
                formData
            );
            if (response.data) {
                // alert(`${response.data.message} ${response.data.foundPw}`);
                alert("임시 비밀번호를 발급해드리겠습니다. 꼭 수정하세요.")
                alert(response.data);
                history("/login");
            } else if (response.data.message) {
                alert("올바른 값을 입력하세요");
            }
        } catch (error) {
            console.error("비밀번호 찾기 실패:", error);
            alert(error.response?.data?.message);
        }
    };

    return (
        <Container className="PassSet">
            <h1>비밀번호 찾기</h1>
            <Form className="PassForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicId">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control
                        style={{ width: "22em" }}
                        type="text"
                        name="id"
                        placeholder="아이디를 입력해주세요"
                        required
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        style={{ width: "22em" }}
                        type="email"
                        name="email"
                        placeholder="홍길동@naver.com"
                        required
                        onChange={handleChange}
                    />
                    <Button type="submit" style={{ marginTop: "10px" }}>
                        찾기
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
};

export default PasswordSearch;
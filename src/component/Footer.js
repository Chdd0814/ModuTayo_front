import React from 'react';
import {Row, Col} from "reactstrap";
import './Footer.css'

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year
    };

    return (
        // <div id="main-footer" className="text-center p-2"> 
        // m-auto 왼쪽오른쪽 여백 알아서 맞춰라. m : margin
        <div id="main-footer" className="text-center p-2"> 
            <Row>
                <Col>
                    <p>
                        Copyright &copy; <span>{thisYear()} Korea Polytechnics 2-B 1st Group Project</span>
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
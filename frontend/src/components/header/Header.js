import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import { Button, Modal, Form } from 'react-bootstrap';
import api from "../../api/axiosConfig";

const Header = () => {
    const setCookie = (name, value, days) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
        document.cookie = `${name}=${cookieValue}; path=/`;
    };

    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return "";
    };
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(true);
    const [isLogin, setisLogin] = useState(getCookie("username")!=="") ; // 新增状态用于切换登录和注册

    const handleToggleModal = (flage) => {

        setShowModal(!showModal);
        setIsRegister(flage);
    };

    const handleLogout = () => {
        setCookie("username","",100)
        setisLogin(false)
        window.location.href = '/';

    };

    const handleLogin = async () => {

        try {
            console.log('Login:', username, password);
            const response = await api.post(`/api/v1/users/login?username=${username}&password=${password}`);
            setCookie("username",response.data.username)
            window.location.reload()
            // 处理成功的逻辑
        } catch (error) {
            // 显示提示信息
            alert(error.response.data.message);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await api.post(`/api/v1/users/register?username=${username}&password=${password}`);
            setShowModal(false);
            window.location.reload()
            // 处理成功的逻辑
        } catch (error) {
            // 显示提示信息
            alert(error.response.data.message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{ color: 'gold' }}>
                    <FontAwesomeIcon icon={faVideoSlash} />Gold
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/find">
                            find
                        </NavLink>
                    </Nav>
                    {isLogin ?( <Button variant="outline-info" className="me-2" >
                        {getCookie("username")}
                    </Button>):("")}

                    {isLogin ? (
                        <Button variant="outline-info" className="me-2" onClick={() => handleLogout(false)}>
                            Logout
                        </Button>
                    ) : (
                        <Button id={123456} variant="outline-info" className="me-2" onClick={() => handleToggleModal(false)}>
                            Login
                        </Button>
                    )}
                    {/*<Button variant="outline-info" className="me-2" onClick={() => handleToggleModal(false)}>*/}
                    {/*    {isLogin ? 'Logout' : 'Login'}*/}
                    {/*    /!*Login*!/*/}
                    {/*</Button>*/}
                    <Button variant="outline-info" className="me-2" onClick={() => handleToggleModal(true)}>
                        register
                    </Button>
                </Navbar.Collapse>
            </Container>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isRegister ? 'Register' : 'Login'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {isRegister ? (
                        <Button variant="primary" onClick={handleRegister}>
                            Register
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </Navbar>
    );
};

export default Header;
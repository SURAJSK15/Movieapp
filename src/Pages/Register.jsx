import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'

import { useDispatch } from "react-redux";
import { AddNewUserAsync } from "../feature/User/UserSlice";
const Register = () => {
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const GetFormData = async (data) => {
        try {
            const response = await dispatch(AddNewUserAsync({ email: data.email, user: data.user, password: data.password }));
         

            if (response && response.error && response.error.message === "Email already registered") {
                alert("Email already registered");
              
            } 
            else {
                alert("USER is Created");
                navigate('/');
            }
        }
        catch (error) {

            console.error("error.message:", error.message);
            alert(error.message);
        }

    }
    return (
        <>
            <div className="register-background login-bg">
                <Container fluid>
                    <Row className="justify-content-center align-items-center">
                    <Col  xs={10} lg={6}>
                            <div className="register-main-content">
                                <div className="register-title">
                                    <h2>Create an account</h2>
                                    <p>Join us to watch new <span>Movies</span> and <span>Series</span></p>
                                </div>
                                <form noValidate onSubmit={handleSubmit(GetFormData)}>
                                    <div className="sub-content-register">
                                        <p>Name</p>
                                        <input type="text" id="user" {...register("user", {
                                            required: 'Name is Required',
                                            pattern: {
                                                value: /^[a-zA-Z\s]+$/,
                                                message: `Name is not vaild`
                                            }
                                        })} />
                                        {errors.user && <p className="text-red-700 text-left">{errors.user.message}</p>}
                                        <p>Email</p>
                                        <input type="email" id="email" {...register("email", {
                                            required: 'Email is Required',
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                message: `email is not vaild`
                                            }
                                        })} />
                                        {errors.email && <p className="text-red-700 text-left">{errors.email.message}</p>}
                                        <p>Password</p>
                                        <input type="password" id="password" {...register("password", { required: "password is Required" })} /> <br />
                                        {errors.password && <p className="text-red-700 text-left">{errors.password.message}</p>}
                                        <div className="register-btn-content">
                                            <button type="submit" className="register-btn">Submit</button>
                                            <NavLink to="/" className="login-btn">Already Have an account <span>LogIn</span></NavLink>
                                        </div>
                                    </div>
                                </form>


                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}

export default Register;

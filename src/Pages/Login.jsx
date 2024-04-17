import React, { useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogInUserAsync, loginUser } from "../feature/User/UserSlice";
import { FetchWatchlistByuser } from "../feature/User/UserApi";

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, watch, formState: { errors }, handleSubmit } = useForm();

    const user = useSelector(loginUser);

    if (user) {
        navigate('/Movie')
    }



    const GetLoginData = async (data) => {
        try {
            const response = await dispatch(LogInUserAsync({ email: data.email, password: data.password }));

            alert(response.error.message)
         
            return response
        }
        catch (error) {
         return error
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
                                    <h2>Welcome Back!</h2>
                                    <p>Join the binge-watch <span>revolution!</span> Discover the best in online series here.</p>
                                </div>
                                <form noValidate onSubmit={handleSubmit(GetLoginData)}>
                                    <div className="sub-content-register">

                                        <p>Email</p>
                                        <input type="email" id="email" {...register("email", {
                                            required: 'Name is Required',

                                        })} />
                                        {errors.email && <p className="text-red-700 text-left">{errors.email.message}</p>}
                                        <p>Password</p>
                                        <input type="password" id="password" {...register("password", {
                                            required: 'password is Required',

                                        })} />
                                        {errors.password && <p className="text-red-700 text-left">{errors.password.message}</p>}
                                        <br />
                                        <button type="submit" className="register-btn">Submit</button>
                                        <div className="register-btn-content">


                                            <NavLink to="/Register" className="login-btn">Create New  <span>Account</span></NavLink>
                                        
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

export default LogIn;

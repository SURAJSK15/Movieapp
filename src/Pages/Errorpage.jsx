import React from 'react'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function ErrorPage() {
    return (

        <Container>
            <div class="error-page">
                <h6 >404</h6>
                <h1 >Page not found</h1>
                <p >Sorry, we couldn’t find the page you’re looking for.</p>
                <div class="goback-btn">
                    <NavLink to="/"> Go Home Page </NavLink>
                  
                </div>
            </div>
        </Container>
    )
}


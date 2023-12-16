import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import api from "../../index";

function LoginForm({btn}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        try {
            event.preventDefault();
            const response = await api.post('/login', {
                email,
                password,
            });
            // Assuming the response contains the token upon successful login
            const token = response.headers.authorization;
			const decoded = jwtDecode(token);
            // console.log(decoded['email']);
            
            // You can now handle the token, like storing it in localStorage, etc.
            if(token !== undefined) {
                localStorage.setItem('token', token);
                window.location.href = '/';
            }
            // Perform actions upon successful login
        } catch (error) {
            console.log(error.response);
			setError(error.response.data.message.replace(/"/g, ""));
            // Handle error, show a message, etc.
        }
    };
    
    return (
        <form className="login page" onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Email ID"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                autoComplete="password"
                placeholder="Password"
            />
            <button className="custom-button" type="submit">LOGIN</button>
            <p className="error">{error}</p>
            <div className="text">
                <a href="/forgot">Forgot Password?</a>
            </div>
            <div className="text">Not Registered?</div>
            <br />
            { btn }
        </form>
    );
}

export default LoginForm;
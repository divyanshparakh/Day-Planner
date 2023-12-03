import React, { useState, useEffect } from "react";
// import { toggleLoginRegister } from "./redux/actions";
import jwtDecode from "jwt-decode";
import ViewWeather from "./Weather/ViewWeather";
import ViewTodos from "./Todos/ViewTodos";
import api from '../index';
import Calendar from "./Calendar/ViewCalendar";

function HomePage() {
	const [decodedToken, setDecodedToken] = useState({});
	const storedToken = localStorage.getItem('token');

	useEffect(() => {
		if (storedToken) {
			const decoded = jwtDecode(storedToken);
			setDecodedToken(decoded);
			const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds

			// Check if the token is about to expire in, say, the next 5 minutes
			const threshold = 5 * 60 * 1000; // 5 minutes
			if(expirationTime - Date.now() < threshold)
				refreshToken();
		}
	}, [storedToken]);

	const refreshToken = async () => {
        try {
            const response = await api.post("/refresh");
            // Assuming the response contains the token upon successful verification
            const token = response.headers.authorization;
            
            // Refreshing the token
            if(token !== undefined)
                localStorage.setItem('token', token);
        } catch (error) {
            console.log(error.response.data.message.replace(/"/g, ""));
        }
	}

	const handleLogout = () => {
		localStorage.removeItem('token');
		if(localStorage.getItem('token') === null)
			window.location.href = '/auth';
	}

	const logoutButton = (
        storedToken ? <button className="custom-button" onClick={handleLogout}>Logout</button> : ''
	);

    return (
        <div className="homepage">
			<ViewWeather></ViewWeather>
            <ViewTodos decodedToken={decodedToken.email} logoutButton={logoutButton}></ViewTodos>
        </div>
    );
}

export default HomePage;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth/Auth";
import HomePage from './components/HomePage';
import Sidebar from "./components/Sidebar/Sidebar";
import ViewCalendar from "./components/Calendar/ViewCalendar";
import ViewTodos from "./components/Todos/ViewTodos";
import ViewWeather from "./components/Weather/ViewWeather";
import jwtDecode from "jwt-decode";
import api from './index';
import { useAppSelector } from './store/hooks/index.ts';
import React, { useEffect } from "react";

function App() {
	const storedToken = localStorage.getItem('token');
	const userInfo = useAppSelector((state) => state.user);

	useEffect(() => {
		if (storedToken) {
			const decoded = jwtDecode(storedToken);
			const expirationTime = decoded.exp * 1000; // Convert to milliseconds

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
		setTimeout(() => {
			localStorage.clear();
			if(localStorage.getItem('token') === null)
				window.location.href = '/auth';
		}, 500);
	}

	const logoutButton = (
        storedToken ? <button className="custom-button" onClick={handleLogout}>Logout</button> : ''
	);

	return (
		<div className="App">
			<ViewWeather logoutButton={logoutButton}></ViewWeather>
			<Sidebar></Sidebar>
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={ storedToken ? <Navigate to="/calendar" /> : <Auth></Auth> }></Route>
					<Route index path="/calendar" element={ storedToken ? <ViewCalendar></ViewCalendar> : <Navigate to="/auth" /> } />
					<Route path="/todos" element={ storedToken ? <ViewTodos></ViewTodos> : <Navigate to="/auth" /> } />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

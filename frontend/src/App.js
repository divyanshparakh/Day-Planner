import ReactDOM from "react-dom/client";
// import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth";
import ViewTodos from './components/ViewTodos';
import jwtDecode from "jwt-decode";



function App() {
	const [logIn, setLogIn] = useState(false);
	const storedToken = localStorage.getItem('token');
	const [decodedToken, setDecodedToken] = useState({});

	useEffect(() => {
		if (storedToken) {
			const decoded = jwtDecode(storedToken);
			setDecodedToken(decoded);
		}
	}, [storedToken]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		if(localStorage.getItem('token') === null)
			window.location.href = '/';
	}

	const logoutButton = (
				storedToken ? <button className="custom-button" onClick={handleLogout}>LOGOUT</button> : ''
	);

	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={storedToken ? <Navigate to="/" /> : <Auth></Auth>}></Route>
					<Route index element={storedToken ? <ViewTodos decodedToken={decodedToken.email} logoutButton={logoutButton}></ViewTodos> : <Navigate to="/auth" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

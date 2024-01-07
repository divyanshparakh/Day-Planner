import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux'
import { store } from './store/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
const baseURL = process.env.REACT_APP_SERVER_API_URL;
root.render(
	<React.StrictMode>
		<Provider store={store}> {/* Passing store so that it can be accessible from anywhere inside it */}
			<App />
		</Provider>
	</React.StrictMode>
);

const api = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
		"Content-Type": "application/json;charset=UTF-8",
		"Accept": "application/vnd.api+json",
		"Authorization": localStorage["token"],
    }
});

// reportWebVitals();

export default api;
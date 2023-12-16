import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewWeather.scss';
import { SearchResultsList } from "./SearchResultsList";
import { useAppSelector, useAppDispatch } from '../../store/hooks/index.ts';
import { addWeather } from '../../store/slices/weather/currentWeather.ts';
import { addForecast } from '../../store/slices/weather/forecastWeather.ts';
import { addLocation } from '../../store/slices/weather/location.ts';

function ViewWeather({ logoutButton }) {
    const dispatch = useAppDispatch();
    
    const currentWeather = useAppSelector((state) => state.weather);
    const currentForecast = useAppSelector((state) => state.forecast);
    const currentLocation = useAppSelector((state) => state.location);
    const [locationLists, setLocationLists] = useState();
    // const [currentWeather, setCurrentWeather] = useState();
	const selectedLocation = localStorage.getItem('selected-loc');
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

	useEffect(() => {
        if(selectedLocation) {
            console.log(selectedLocation);
            getCurrentWeather(selectedLocation);
        }
	}, [selectedLocation]);

    const weatherApi = axios.create({
        baseURL: 'https://weatherapi-com.p.rapidapi.com/',
        timeout: 1000,
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/vnd.api+json",
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    });

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const searchLocation = async (inputLocation) => {
        // console.log(inputLocation.length);
        if(inputLocation.length > 0) {
            try {
                // console.log(inputLocation);
                const response = await weatherApi.get("/search.json", {
                    params: {
                        q: inputLocation,
                    }
                });
                if(response.status === 200) {
                    const results = response.data;
                    setLocationLists(results);
                    // console.log(results);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Handle Unauthorized error, e.g., redirect to login page
                    console.log(error.response.message);
                } else {
                    console.error(error.response.data.message);
                }
            }
        }
    };
    
    const getCurrentWeather = async (selectedLocation) => {
        // console.log(selectedLocation);
        if(isJsonString(selectedLocation))
            selectedLocation = JSON.parse(selectedLocation);
        try {
            const response = await weatherApi.get("/forecast.json", {
                params: {
                    q: selectedLocation['lat'] + ',' + selectedLocation['lon'],
                    days: 3
                }
            });

            if(response.status === 200) {
                const results = response.data;
                // console.log(results);
                dispatch(addWeather(results['current']));
                dispatch(addForecast(results['forecast']['forecastday']));
                dispatch(addLocation(results['location']));
                // setCurrentWeather(results);
                document.getElementById('search-location').value = "";
            } else {
                console.error("Error fetching weather: Unexpected status code", response.status);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error, e.g., redirect to login page
                console.log('API key has expired.');
            } else {
                console.error("Error fetching Location:", error);
            }
        }
    }

    const handleResultClick = async (result) => {
        setLocationLists(null);
        localStorage.setItem('selected-loc', JSON.stringify(result));
        await getCurrentWeather(result);
    };

    const handleSearchLocation = async (result) => {
        await searchLocation(result);
    };

    const handleChangeLocation = async (result) => {
        document.getElementById('search-location').focus();
    }
    
    return (
        <div className="view-weather-wrapper">
            {
                currentWeather && Object.keys(currentWeather).length > 0 && (
                    <div className="selected-location-weather">
                        <img src={currentWeather['condition']['icon']} alt="" srcset="" height={35} />
                        <p className='location' onClick={(e) => {handleChangeLocation()}}>
                            {currentLocation['name']}
                        </p>
                        <p>
                            {currentWeather['feelslike_c']}&deg;C
                        </p>
                        <p>
                            {currentWeather['condition']['text']}
                        </p>
                        <p>
                            Gust: {currentWeather['gust_kph']}
                        </p>
                        <p>
                            Humidity: {currentWeather['humidity']}%
                        </p>
                        <p>
                            Percipitation: {currentWeather['precip_mm']}mm
                        </p>
                        <p>
                            UV: {currentWeather['uv']}/10
                        </p>
                        <p>
                            Wind: {currentWeather['wind_kph']}kph
                        </p>
                        <p>
                            Rain: {currentForecast[0]['day']['daily_will_it_rain']}%
                        </p>
                    </div>
                )
            }
            <div className="search-location">
                <div className="search-location-wrapper">
                    <input type="text" id="search-location"  placeholder="Search Location" pattern="[A-Za-z]" onChange={async (e) => handleSearchLocation(e.target.value)} />
                </div>
                { locationLists && locationLists.length > 0 && <SearchResultsList results={locationLists} handleResultClick={handleResultClick} /> }
            </div>
            { logoutButton }       
        </div>
    );
}

export default ViewWeather;
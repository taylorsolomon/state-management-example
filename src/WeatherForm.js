import { useState } from "react"

function WeatherForm() {
    const [lat, setLat] = useState('38.8976978')
    const [long, setLong] = useState('-77.072576')
    const [weatherData, setWeatherData] = useState([])

    const zoneURL = `https://api.weather.gov/points/${lat},${long}`

    async function grabData() {
        const pointData = await fetch(zoneURL)
        const pointResponseData = await pointData.json();
        const zone = pointResponseData.properties.forecastZone.split('/')[5];
        const forecastURL = `https://api.weather.gov/zones/RNS/${zone}/forecast`
        const data = await fetch(forecastURL)
        const responseData = await data.json()
        const periods = responseData.properties.periods
        setWeatherData(periods)
        return responseData;
    }

    function initializeGetData() {
        grabData()
    }

    return (
        <div>
            <label htmlFor="lat">Latitude</label>
            <input type="text" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} /> 

            <label htmlFor="long">Longitude</label>
            <input type="text" id="long" value={long} onChange={(e) => setLong(e.target.value)}  /> 

            <button type="button" onClick={() => initializeGetData()}>Click me to get Data!</button>    
            <ul>
                {
                    weatherData.map(period => (
                        <li>
                            <h3>{period.name}</h3>
                            <p>{period.detailedForecast}</p>
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

export default WeatherForm;
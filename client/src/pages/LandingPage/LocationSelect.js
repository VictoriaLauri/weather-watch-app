import React, { useState } from "react";

const popularCities = [
    { name: "New York", country: "US" },
    { name: "Toronto", country: "CA" },
    { name: "Dallas", country: "US" },
    { name: "Mexico City", country: "MX" },
    { name: "Bogota", country: "CO" },
    { name: "São Paulo", country: "BR" },
    { name: "Buenos Aires", country: "AR" },
    { name: "London", country: "GB" },
    { name: "Paris", country: "FR" },
    { name: "Zurich", country: "CH" },
    { name: "Berlin", country: "DE" },
    { name: "Cairo", country: "EG" },
    { name: "Moscow", country: "RU" },
    { name: "Mumbai", country: "IN" },
    { name: "Hong Kong", country: "HK" },
    { name: "Tokyo", country: "JP" },
    { name: "Sydney", country: "AU" },
  ];

  //call the coordinates of the chosen city
  const fetchCityCoordinates = async (city, countryCode) => {
    const response = await fetch(
      `/api/weather/location-coords?city=${city}&country=${countryCode}`
    );
    const data = await response.json();
    return data[0]; 
  };

  
  //function
  const LocationSelect = ({ onLocationChosen }) => {
    const [selected, setSelected] = useState("");
  
    const handleChange = async (e) => {
      const [city, country] = e.target.value.split(",");
      setSelected(e.target.value);
  
      const coords = await fetchCityCoordinates(city, country);
      if (onLocationChosen) {
        onLocationChosen(coords); 
      }
  
      // still have to save coords in a variable we can access in the next page

    };
  

    return (
        <select className="location-select" value={selected} onChange={handleChange}>
          <option value="">Pick a location</option>
          {popularCities.map((city, index) => (
            <option key={index} value={`${city.name},${city.country}`}>
              {city.name}, {city.country}
            </option>
          ))}
        </select>
      );
    };


export default LocationSelect
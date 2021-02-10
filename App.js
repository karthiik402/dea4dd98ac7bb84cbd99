//import logo from './logo.svg';
import './App.css';
import React,{useState} from "react";
import { Button } from '@material-ui/core';

function App() {
  let [country,setCountry] = useState("");
  let [countryPage,setCountryPage] = useState(false);
  let[capital,setCapital] = useState("");
  let[population,setpopulation] = useState("");
  let[latlng,setlatlng] = useState("");
  let[flag,setflag] = useState("");
  let [weather,setWeather] = useState(false);
  let [temperature,setTemperature] =useState("");
  let [weatherIcons,setweatherIcons] =useState("");
  let [precip,setprecip] =useState("");
  let [windSpeed,setwindSpeed] =useState("");


  const clickHandler = ()=>{
    console.log(country);
      fetch(`https://restcountries.eu/rest/v2/name/${country}`,
      {method:"GET"}
      )
      .then((res)=>res.json())
      .then((result)=>
      {
        console.log(result[0]);
        setCapital(result[0].capital);
        setpopulation(result[0].population);
        setlatlng(result[0].latlng);
        setflag(result[0].flag);
        setCountryPage(true);
      }
      )
      .catch((e)=>console.log(e));
  }
  const getWeather = ()=>{
    fetch(`http://api.weatherstack.com/current?access_key=84f6de299a1834968a4c02fbfe0d7791&query=${capital}`,{
      method:"POST"
    })
    .then((res)=>res.json())
    .then((response)=>{
      setTemperature(response.current.temperature);
      setprecip(response.current.precip);
      setwindSpeed(response.current.wind_speed);
      setweatherIcons(response.current.weather_icons);
    }
      )
    .catch((e)=>console.log(e))
    setWeather(true);
  }
  return (
    <>
    {countryPage ? 
    <>
    {weather ? 
    <>
    <h3 style={{textAlign:"center"}}>temperature: {temperature} degree celsius</h3>
    <img src={weatherIcons} style={{width:"200px",height:"200px",marginLeft:"45%"}}></img>
    <h3 style={{textAlign:"center"}}>Precip: {precip}</h3>
    <h3 style={{textAlign:"center"}}>Current WindSpeed: {windSpeed} kmps</h3>
    </>
    :
     <>
     <h1 style={{textAlign:"center"}}>{country.toUpperCase()}</h1>
     <img src={flag} style={{width:"500px",height:"500px",marginLeft:"35%",marginTop:"-5%",marginBottom:"-0%"}}></img>
     <h3 style={{textAlign:"center"}}>Capital:{capital}</h3>
     <h3 style={{textAlign:"center"}}>Population:{population}</h3>
     <h3 style={{textAlign:"center"}}>Latitude:{latlng[0]}</h3>
     <h3 style={{textAlign:"center"}}>Longitude:{latlng[1]}</h3>
     <button onClick={getWeather} style={{backgroundColor:"green",height:"50px",width:"200px",borderRadius:"10px",marginLeft:"45%"}}>Capital Weather</button>
     </>
    }
    </>
    :
    <>
    <h1 style={{textAlign:"center"}}>Welcome</h1>
    <div style={{position:"absolute",top:"100px",left:"700px"}}>
    <input type="text" placeholder="Enter country" value={country} onChange={(e)=>setCountry(e.target.value)} style={{borderRadius:"10px",width:"200px",height:"40px" }}></input>
    <button type="submit" disabled={country===""} onClick={clickHandler} style={{color:"tomato",backgroundColor:"green",height:"40px",width:"140px",marginLeft:"10px",borderRadius:"10px"}} >Click Here</button>
    </div>
    </>
}
    </>
  );
}

export default App;

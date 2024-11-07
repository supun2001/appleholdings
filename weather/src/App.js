import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper, Box, Alert, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import bg from "./assets/img/bg.jpg"

// Define a custom theme for the app
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f4f4f9",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
});

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  // API
  const API_KEY = "14013ba17f6878bd040cbbe8a1e6fdf3";
  console.log(API_KEY);
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const getWeather = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      });
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      getWeather();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
 <Paper
  elevation={3}
  sx={{
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    opacity: 0.9,
    textAlign: "center",
    margin: "40px",
    width: "calc(100% - 80px)",  // Ensures that the width accounts for the 40px margin on both sides
    maxWidth: "600px",  // Optionally, set a max width for large screens
  }}
>
  <Typography variant="h4" gutterBottom>
    Weather App
  </Typography>
  
  <Box component="form" onSubmit={handleSubmit} mb={2} display="flex" justifyContent="center">
    <TextField
      label="Enter city name"
      variant="outlined"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      fullWidth
      style={{ marginRight: "10px" }}
    />
    <Button variant="contained" color="primary" type="submit">
      Get Weather
    </Button>
  </Box>

  {error && (
    <Alert severity="error" style={{ marginTop: "10px" }}>
      {error}
    </Alert>
  )}

  {weatherData && (
    <Box mt={3}>
      <Typography 
        variant="h5" 
        sx={{ textTransform: 'uppercase', fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}
      >
        <LocationOnIcon /> {weatherData.name}
      </Typography>
      
      <Typography 
        variant="h1" 
        sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5rem' } }}
      >
        {weatherData.main.temp}°C
      </Typography>
      
      <Typography 
        variant="h3" 
        sx={{ textTransform: 'uppercase', fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }}
      >
        {weatherData.weather[0].description}
      </Typography>

      <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="column" alignItems="center" spacing={1}>
            <DeviceThermostatIcon />
            <Typography style={{ color: '#a5a5a5' }}>Max Temp</Typography>
            <Typography>{weatherData.main.temp}°C</Typography>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={1}>
            <WaterDropIcon />
            <Typography style={{ color: '#a5a5a5' }}>Humidity</Typography>
            <Typography>{weatherData.main.humidity}%</Typography>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={1}>
            <AirIcon />
            <Typography style={{ color: '#a5a5a5' }}>Wind Speed</Typography>
            <Typography>{weatherData.wind.speed} m/s</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )}
</Paper>

      </div>
    </ThemeProvider>
  );
}

export default App;

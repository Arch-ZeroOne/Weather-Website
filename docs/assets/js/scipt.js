const cardContent = document.getElementById("card-content");

document.addEventListener("DOMContentLoaded", () => {
  getWeatherData("Davao");
});

document.getElementById("cityName").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkBlankInputs();
  }
});

function checkBlankInputs() {
  const country = document.getElementById("cityName").value;

  if (!country) {
    Swal.fire({
      title: "Error !!",
      text: "Input field cannot be empty",
      icon: "error",
    });
    return;
  }

  getWeatherData(country);
}

async function getWeatherData(country) {
  try {
    const key = "ff8809e4f2c4dab9e8aa2a213ded9df5";
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${key}&units=metric`
    );

    if (!request.ok) {
      Swal.fire({
        title: "Error !!",
        text: "City name not found",
        icon: "error",
      });
      throw new Error();
    }

    const convert = await request.json();

    displayWeatherData(convert);
  } catch (error) {
    console.log(error.name);
  }

  function displayWeatherData(convert) {
    const {
      name,
      main: { temp, humidity, feels_like },
      weather: [{ id, main, description }],
      wind: { speed },
    } = convert;

    const splitDescription = description.split("");
    splitDescription[0] = splitDescription[0].toUpperCase();

    document.getElementById("city").innerHTML = name;
    document.getElementById("celsius").innerHTML = `${temp}℃`;
    document.getElementById("feel").innerHTML = `${Math.ceil(feels_like)}℃`;
    document.getElementById("wind-status").innerHTML = `${speed}km/h`;
    document.getElementById("weather-feel").innerHTML =
      splitDescription.join("");

    displayIcon(id, country);
    document.getElementById("cityName").value = "";
  }

  function displayIcon(id) {
    document.getElementById(`icon`).src = getIcon(id);
  }

  function getIcon(id) {
    switch (true) {
      case id >= 200 && id < 300:
        return "assets/images/weather-forecasts/thunderstorm.png";
      case id >= 300 && id < 500:
        return "assets/images/weather-forecasts/slow-rain.png";
      case id >= 500 && id < 600:
        return "assets/images/weather-forecasts/rain.png";
      case id >= 600 && id < 701:
        return "assets/images/weather-forecasts/snowy.png";
      case id >= 701 && id < 800:
        return "assets/images/weather-forecasts/wind.png";
      case id > 800:
        return "assets/images/weather-forecasts/cloudy.png";
      case id === 800:
        return "assets/images/weather-forecasts/sunny.png";
    }
  }
}

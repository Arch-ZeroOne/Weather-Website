import * as dotenv from "dotenv";

dotenv.config();

const cityName: HTMLElement | null = document.getElementById("cityName");

document.addEventListener("DOMContentLoaded", () => {
  getWeatherData("Davao");
});

if (cityName) {
  cityName.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      checkBlankInputs();
    }
  });
}

function checkBlankInputs() {
  let selectCountry: string = "";
  //Used the as keyword to specify the type of input element getCountry will use
  const getCountry: HTMLInputElement = document.getElementById(
    "cityName"
  ) as HTMLInputElement;

  if (getCountry) {
    selectCountry = getCountry.value;
  }

  getWeatherData(selectCountry);
}

async function getWeatherData(country: string) {
  try {
    //BASE URL : https://api.openweathermap.org/data/2.5/weather?q={countryName]&units=metric
    const api_key = process.env.API_KEY;
    //https://api.openweathermap.org/data/2.5/weather?q=Davaoppid=ff8809e4f2c4dab9e8aa2a213ded9df5&units=metric

    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}&units=metric`
    );

    const convert = await request.json();
    console.log(convert);
    displayWeatherData(convert);
  } catch (error) {
    console.log(error);
  }

  function displayWeatherData(convert: any) {
    const {
      name,
      main: { temp, humidity, feels_like },
      weather: [{ id, main, description }],
      wind: { speed },
    } = convert;

    const splitDescription = description.split("");
    splitDescription[0] = splitDescription[0].toUpperCase();

    const cityName = document.getElementById("city") as HTMLInputElement;
    const celsiusValue = document.getElementById("celsius") as HTMLInputElement;
    const feelValue = document.getElementById("feel") as HTMLInputElement;
    const windStatus = document.getElementById(
      "wind-status"
    ) as HTMLInputElement;
    const weatherFeel = document.getElementById(
      "weather-feel"
    ) as HTMLInputElement;

    cityName.innerHTML = name;
    celsiusValue.innerHTML = `${temp}℃`;
    feelValue.innerHTML = `${Math.ceil(feels_like)}℃`;
    windStatus.innerHTML = `${speed}km/h`;
    weatherFeel.innerHTML = splitDescription.join("");

    displayIcon(id);
    cityName.value = "";
  }

  function displayIcon(id: number) {
    const imageIcon: HTMLImageElement = document.getElementById(
      `icon`
    ) as HTMLImageElement;

    if (imageIcon) {
      const icon: string | undefined = getIcon(id);
      //Provides a default value to remove the TS Undefined variable error
      imageIcon.src = icon ?? "";
    }
  }

  function getIcon(id: number) {
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

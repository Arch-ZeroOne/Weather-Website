"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cityName = document.getElementById("cityName");
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
    let selectCountry = "";
    //Used the as keyword to specify the type of input element getCountry will use
    const getCountry = document.getElementById("cityName");
    if (getCountry) {
        selectCountry = getCountry.value;
    }
    getWeatherData(selectCountry);
}
function getWeatherData(country) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //BASE URL : https://api.openweathermap.org/data/2.5/weather?q={countryName]&units=metric
            const api_key = "ff8809e4f2c4dab9e8aa2a213ded9df5";
            //https://api.openweathermap.org/data/2.5/weather?q=Davaoppid=ff8809e4f2c4dab9e8aa2a213ded9df5&units=metric
            const request = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${api_key}&units=metric`);
            const convert = yield request.json();
            console.log(convert);
            displayWeatherData(convert);
        }
        catch (error) {
            console.log(error);
        }
        function displayWeatherData(convert) {
            const { name, main: { temp, humidity, feels_like }, weather: [{ id, main, description }], wind: { speed }, } = convert;
            const splitDescription = description.split("");
            splitDescription[0] = splitDescription[0].toUpperCase();
            const cityName = document.getElementById("city");
            const celsiusValue = document.getElementById("celsius");
            const feelValue = document.getElementById("feel");
            const windStatus = document.getElementById("wind-status");
            const weatherFeel = document.getElementById("weather-feel");
            cityName.innerHTML = name;
            celsiusValue.innerHTML = `${temp}℃`;
            feelValue.innerHTML = `${Math.ceil(feels_like)}℃`;
            windStatus.innerHTML = `${speed}km/h`;
            weatherFeel.innerHTML = splitDescription.join("");
            displayIcon(id);
            cityName.value = "";
        }
        function displayIcon(id) {
            const imageIcon = document.getElementById(`icon`);
            if (imageIcon) {
                const icon = getIcon(id);
                //Provides a default value to remove the TS Undefined variable error
                imageIcon.src = icon !== null && icon !== void 0 ? icon : "";
            }
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
    });
}

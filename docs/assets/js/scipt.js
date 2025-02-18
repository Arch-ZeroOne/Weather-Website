const cardContent = document.getElementById("card-content");

function checkBlankInputs() {
  document.getElementById("card-content").innerHTML = "";
  document.getElementById("emoji").innerHTML = "";
  const country = document.getElementById("country").value;

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
    console.log(error);
  }
}

function displayWeatherData(convert) {
  const {
    name,
    main: { temp, humidity },
    weather: [{ id, main, description }],
  } = convert;

  const h1 = document.createElement("h1");
  const h2 = document.createElement("h2");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");

  h1.innerHTML = name;
  h2.innerHTML = `${temp} ℃`;
  p1.innerHTML = `Humidity: ${humidity}%`;
  p2.innerHTML = description;

  document.getElementById("card-content").append(h1, h2, p1, p2);
  document.getElementById("main-card").style.display = "flex";
  displayEmoji(id, country);
}

function displayEmoji(id) {
  document.getElementById(`emoji`).innerHTML = getEmoji(id);
  country.value = "";
  country.focus();
}

function getEmoji(id) {
  switch (true) {
    case id >= 200 && id < 300:
      return "⛈️";
    case id >= 300 && id < 500:
      return "🌦️";
    case id >= 500 && id < 600:
      return "🌧️";
    case id >= 600 && id < 701:
      return "❄️";
    case id >= 701 && id < 800:
      return "🍃";
    case id > 800:
      return "☁️";
    case id === 800:
      console.log(id);
      return "☀️";
  }
}

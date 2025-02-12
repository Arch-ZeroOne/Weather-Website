const cardContent = document.getElementById("card-content");

function checkBlankInputs() {
  document.getElementById("card-content").innerHTML = "";
  document.getElementById("emoji").innerHTML = "";
  const country = document.getElementById("country").value;
  if (!country) {
    cardContent.innerHTML = `<h1 id = "error-message"> No country inputed </h1>`;
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
      cardContent.innerHTML = `<h1 id = "error-message"> Country not found</h1>`;
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
  h2.innerHTML = temp;
  p1.innerHTML = `Humidity ${humidity}`;
  p2.innerHTML = description;

  console.log(convert);

  document.getElementById("card-content").append(h1, h2, p1, p2);
  document.getElementById("main-card").style.display = "flex";
  displayEmoji(id);
}

function displayEmoji(id) {
  document.getElementById(`emoji`).innerHTML = getEmoji(id);
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

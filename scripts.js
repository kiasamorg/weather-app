const apiKey = "1277925bf3972296e31d22b801102123";
const lat = 4.34;
const lon = 13.99;

fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    const localTime = new Date((data.dt + data.timezone) * 1000);
    const timeOptions = { hour: "2-digit", minute: "2-digit", timeZone: "UTC" };
    const timeString = localTime.toLocaleTimeString("ru-RU", timeOptions);

    document.getElementById("time").textContent = timeString + " AM";
    document.getElementById("main").textContent = `${data.weather[0].main}`;
    document.getElementById("city").textContent = `${data.name}`;
    document.getElementById("visibility").textContent = `${
      data.visibility / 1000
    } mi`;
    document.getElementById("clouds").textContent = `${data.clouds.all}%`;
    document.getElementById("wind").textContent = `${data.wind.speed} mph`;
    document.getElementById("humidity").textContent = `${data.main.humidity}`;
    document.getElementById("temp").textContent = `${Math.floor(
      data.main.temp
    )}`;
  })
  .catch((error) => {
    console.error("Произошла ошибка:", error);
    document.getElementById("city").textContent = "Ошибка загрузки данных";
  });

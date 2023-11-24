function getData() {
  const date = new Date();
  let currentDate = `${date}`;

  const getHeader = document.getElementById("header");
  const getLocation = document.getElementById("location");
  const getCurrent = document.getElementById("current");

  const apiKey = "e6e353c05ef69868be1ab412bd9a65a0";

  var createInputField = document.createElement("input");//I want this to get updated according to user input and append it in fetch


  createInputField.setAttribute("type", "text");
  createInputField.setAttribute("autocomplete", "on");
  createInputField.style.backgroundColor = "white";

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  createInputField.addEventListener("input", function (event) {
    const city = event.target.value;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data;

    

        const createLocation = document.createElement("div");
        createLocation.setAttribute("class", "city");
        createLocation.innerText = result.name + ", " + result.sys.country;

        const createDate = document.createElement("div");
        createDate.setAttribute("class", "date");
        createDate.innerText = currentDate.slice(0, 15);

        const createTemp = document.createElement("div");
        createTemp.setAttribute("class", "temp");
        createTemp.innerText = kelvinToCelsius(result.main.temp) + "°c";

        const createWeather = document.createElement("div");
        createWeather.setAttribute("class", "weather");
        createWeather.innerText = result.weather[0].main;

        const createMinMaxTemp = document.createElement("div");
        createMinMaxTemp.setAttribute("class", "tempminmax");
        createMinMaxTemp.innerText =
          kelvinToCelsius(result.main.temp_max) +
          "°c" +
          " / " +
          kelvinToCelsius(result.main.temp_min) +
          "°c";

        getLocation.innerHTML = ""; 
        getLocation.append(createLocation);
        getLocation.append(createDate);

        getCurrent.innerHTML = ""; 
        getCurrent.append(createTemp);
        getCurrent.append(createWeather);
        getCurrent.append(createMinMaxTemp);
      });
  });

  getHeader.append(createInputField);
}

getData();

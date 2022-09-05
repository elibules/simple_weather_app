const key = "fa69005aa371478eb7b202327222908";

function getCurrentDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDay();

  return `${year}-${month}-${day}`;
}

function getAllNames() {
  //   fetch("../data/data.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //    });
  //   let xhr = new XMLHttpRequest();
  //   xhr.open("GET", "../data/data.json");
  //   xhr.onload = () => {
  //     let content = JSON.parse(xhr.responseText);
  //     for (let i = 0; i < content.length; i++) {
  //       const element = content[i];
  //       console.log(element);
  //     }
  // };
  // xhr.send(null);

  $.getJSON("../data/data.json", (data) => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      console.log(element);
      $("#app").append(`<p>${element.name}</p>`);
    }
  }).fail((e) => alert(e.statusText));
}

async function getCurrentWeather(location) {
  // if (navigator.geolocation)
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position, getCurrentDate());
  await $.get(
    // `http://api.weatherapi.com/v1/current.json?key=${key}&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`
    `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`,
    (data) => {
      console.log(data);

      // localStorage.setItem("weatherData", JSON.stringify(data));

      let region = "";
      if (data.location.region) region = data.location.region + ", ";

      JSON.parse(localStorage.getItem("switch"))
        ? $("#weather").html(
            `<h1 style="font-size: 36px"><div></div>${data.location.name}, ${region} ${data.location.country} </h1>
          <div id="weather-details"> 
          <img src="${data.current.condition.icon}" alt="${data.current.condition.text}"/>
           <p id="details-description">${data.current.condition.text} </p>
         
            <p>Temperature: ${data.current.temp_c}&deg c</p>
            <p>Feels Like: ${data.current.feelslike_c}&deg c</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} kph ${data.current.wind_dir}</p>
            <p>Visibility: ${data.current.vis_km} kilometers</p>
            <p>UV Index: ${data.current.uv}</p>
            <div class="switch-container">
              <span class="switch-label">Metric:</span>
              <div class="switch switch-on">
                <input type="checkbox" id="mSwitch">
                <span class="switch-circle"></span>
              </div>
          </div>
          </div>
            `
          )
        : $("#weather").html(
            `<h1 style="font-size: 36px"><div></div>${data.location.name}, ${region} ${data.location.country}</h1>
        <div id="weather-details">
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}"/>
            <p id="details-description">${data.current.condition.text}</p>
            <p>Temperature: ${data.current.temp_f}&deg f</p>
            <p>Feels Like: ${data.current.feelslike_f}&deg f</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_mph} mph ${data.current.wind_dir}</p>
            <p>Visibility: ${data.current.vis_miles} miles</p>
            <p>UV Index: ${data.current.uv}</p>
            <div class="switch-container">
              <span class="switch-label">Metric:</span>
              <div class="switch">
                <input type="checkbox" id="mSwitch">
                <span class="switch-circle"></span>
              </div>
          </div>
          </div>
            `
          );
    }
  ).fail((e) => {
    alert(e.statusText);
  });
  // });
}

export { getCurrentDate, getAllNames, getCurrentWeather };

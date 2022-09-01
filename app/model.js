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

function getCurrentWeather(location) {
  // if (navigator.geolocation)
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position, getCurrentDate());
  $.get(
    // `http://api.weatherapi.com/v1/current.json?key=${key}&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`
    `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`,
    (data) => {
      console.log(data);

      let region = "";
      if (data.location.region) region = data.location.region + ", ";

      $("#weather").html(
        `<h1>Location: ${data.location.name}, ${region} ${data.location.country}</h1>
        <h2>${data.current.condition.text}</h2>
            <h2>Temperature: ${data.current.temp_f}&deg f</h2>
            <h2>Feels Like: ${data.current.feelslike_f}&deg f</h2>
            <h3>Humidity: ${data.current.humidity}%</h3>
            <h4>Wind: ${data.current.wind_mph} mph ${data.current.wind_dir}</h4>
            <h4>Visibility: ${data.current.vis_miles} miles</h4>
            <h4>UV Index: ${data.current.uv}</h4>
            `
      );
    }
  ).fail((e) => {
    alert(e.statusText);
  });
  // });
}

export { getCurrentDate, getAllNames, getCurrentWeather };

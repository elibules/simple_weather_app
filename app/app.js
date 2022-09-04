import * as Model from "./model.js";

function initListeners() {
  console.log("ready");

  $("#form").submit(function (e) {
    e.preventDefault();
  });

  $("#gwButton").click((e) => {
    const location = $("#gwInput").val();
    if (location) {
      getWeather(location);
    } else alert("You need to put a location in first!");
  });
}

function getWeather(location) {
  Model.getCurrentWeather(location);
  $("#gwInput").val("");
}

$(document).ready(() => {
  initListeners();
});

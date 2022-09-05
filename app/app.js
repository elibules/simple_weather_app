import * as Model from "./model.js";

function initListeners() {
  $("#form").submit(function (e) {
    e.preventDefault();
  });

  $("#gwButton").click((e) => {
    const location = $("#gwInput").val();
    const days = $("#dInput").val();
    if (location && days) {
      getWeather(location, days);
    } else alert("You need to put a location and number of days in first!");
  });
}

function getWeather(location, days) {
  Model.getCurrentWeather(location, days).then(() => {
    $("#mSwitch").prop("checked", JSON.parse(localStorage.getItem("switch")));
    $("#gwInput").val("");
    $("#mSwitch").click((e) => {
      const b = $("#mSwitch").is(":checked");
      localStorage.setItem("switch", b);
      getWeather(location);
    });
  });
}

$(document).ready(() => {
  initListeners();
  if (!localStorage.getItem("switch")) localStorage.setItem("switch", "false");
});

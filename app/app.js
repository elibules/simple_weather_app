import * as Model from "./model.js";

function initListeners() {
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
  Model.getCurrentWeather(location).then(() => {
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

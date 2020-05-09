
//settings.url = buildQueryURL()
//$.ajax(settings).done(updateWeather);

$("#search-button").on("click", function () {
  var searchCity = $("#search-value").val();
  $("#search-value").val("");
  searchWeather(searchCity);
  fiveDays(searchCity)
})

var APIKey = "9e615fcd5c8c91df3f82d284f5941fb2";

// Here we are building the URL we need to query the database
//var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid={your api key}=" + APIKey;


// Here we run our AJAX call to the OpenWeatherMap API
function searchWeather(searchCity) {
  console.log(searchCity);
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=9e615fcd5c8c91df3f82d284f5941fb2",
    method: "GET",
    dataType: "json",
  })

    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {
    localStorageSetter(searchCity);
     
      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);

      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;

      // add temp content to html
      $(".temp").text("Temperature (K) " + response.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + tempF);
    });

}
function localStorageSetter(data) {
const prev = localStorage.getItem("prev")
let newData
if (prev) {
   newData = [...JSON.parse(prev),data]
}
else {
   newData = [data]
}
localStorage.setItem("prev", JSON.stringify(newData));
}

function fiveDays(searchfiveDays) {
  console.log(searchfiveDays);
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${searchfiveDays}&appid=9e615fcd5c8c91df3f82d284f5941fb2`,
    method: "GET",
    dataType: "json",
  })
    .then(function (response) {
      $("#fivedayData").empty()
      console.log(response);
      var FiveDay = []
      var fivedayList = response.list
      for (var i = 0; i < fivedayList.length; i++) {
        var timeoftheDay = fivedayList[i]
        if (timeoftheDay.dt_txt.indexOf("15:00:00") >= 0) { FiveDay.push(timeoftheDay) }
      }
      for (var i = 0; i < FiveDay.length; i++) {
        var divoneDay = $("<div>")
        var heading = $("<h1>")
        var temP = $("<p>")
        var humiD = $("<p>")
        heading.text(FiveDay[i].dt_txt)
        // Convert the temp to fahrenheit
        var tempF = (FiveDay[i].main.temp - 273.15) * 1.80 + 32;
        temP.text("Temperature (F): " + tempF);
        humiD.text("Humidity: " + FiveDay[i].main.humidity);
        divoneDay.append(heading)
        divoneDay.append(temP)
        divoneDay.append(humiD)
        $("#fivedayData").append(divoneDay)
        
      }
    })
}



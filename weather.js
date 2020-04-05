
function buildQueryURL() {

    var queryURL = "https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22";
    return queryURL
}
//settings.url = buildQueryURL()
//$.ajax(settings).done(updateWeather);

var APIKey = "9e615fcd5c8c91df3f82d284f5941fb2";

// Here we are building the URL we need to query the database
//var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid={your api key}=" + APIKey;
searchWeather("New York");

// Here we run our AJAX call to the OpenWeatherMap API
function searchWeather(searchCity) {
    $.ajax({
        url: "api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=9e615fcd5c8c91df3f82d284f5941fb2",
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
      
          // Log the queryURL
          console.log(queryURL);
      
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
function updateWeather(WeatherData) {
    var numTravelCards = "5"
    for (var i = 0; i < NUMCARDS; i++) {
        console.log("City;" + WeatherData[i].city.name)
        console.log("Temperature;" + WeatherData[i].temperature)
        console.log("Humidity;" + WeatherData[i].Humidity)
        console.log("Wind Speed;" + WeatherData[i].windspeed)
    }};
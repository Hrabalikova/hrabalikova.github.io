/***********************************
* Add weather and day widget
***********************************/
//

define([
    "esri/widgets/Weather",
    "esri/widgets/Daylight",
    "esri/widgets/Expand",
  ], function(Weather, Daylight, Expand) {
    return {
      setupWeatherDaylight: function(mapView) {
        let activeWidget;
        // Code for setting up the line of sight widget

        const weather = new Weather({ 
          view: mapView,
          container: "weather-container", //added to the container with other widgets
        });


        const daylight = new Daylight({ 
          view: mapView,
          container: "daylight-container", //addet to the container 
        });

      }
    };
  });
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
          container: "weather-container", //addet to the container called id=widgets
        });


        const daylight = new Daylight({ 
          view: mapView,
          container: "daylight-container", //addet to the container called id=widgets
        });

      /*  const weatherExpand = new Expand({
          view: mapView,
          expandTooltip: "Expand weather widget",
          content: new Weather({
            view: mapView
          }),
          //group: "top-right",
          expanded: true,
          container: "weather-container", //addet to the container called id=widgets
        });
      
        const daylightExpand = new Expand({
          view: mapView,
          expandTooltip: "Expand daylight widget",
          content: new Daylight({
            view: mapView
          }),
          expanded: true,
          container: "daylight-container"

        });
      
        //mapView.ui.add([weatherExpand, daylightExpand],"top-right"); // 
      */


      }
    };
  });
// Global variables
let activeWidget;
let actionBarExpanded = false;

// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {

  // Handle action bar click
  const handleActionBarClick = ({ target }) => {
    if (target.tagName !== "CALCITE-ACTION") {
      return;
    }

    // Remove 'active' class from the previously active widget
    if (activeWidget) {
      const prevElement = document.querySelector(`[data-action-id=${activeWidget}]`);
      prevElement.classList.remove("active");
      document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
    }

    const nextWidget = target.dataset.actionId;

    // Add 'active' class to the newly active widget
    if (nextWidget !== activeWidget) {
      const nextElement = document.querySelector(`[data-action-id=${nextWidget}]`);
      nextElement.classList.add("active");
      document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
      activeWidget = nextWidget;
    } else {
      activeWidget = null;
    }
  };

  // Attach event listeners
  document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);

  document.addEventListener("calciteActionBarToggle", event => {
    actionBarExpanded = !actionBarExpanded;
    view.padding = {
      left: actionBarExpanded ? 150 : 49
    };
  });

  // Hide loader and show shell
  document.querySelector("calcite-shell").hidden = false;
  document.querySelector("calcite-loader").hidden = true;

});









// main.js

  require([
    "modules/mapConfig",
    "modules/basicWidgets",
  //  "modules/layersWidget",
  //  "modules/weatherDaylight",
    "modules/measurementWidget",
  //  "modules/lineOfSightWidget",
    "modules/splashScreen"
  ], function(
    MapConfig,
    BasicWidgets,
    //LayersWidget,
    //WeatherDaylight,
    MeasurementWidget,
    //LineOfSightWidget,
    SplashScreen
  ) {
    // Initialize the map, widgets, etc.
    const mapView = MapConfig.setupScene(); // Capture the returned mapView
    BasicWidgets.setupBasicWidgets(mapView);
   // LayersWidget.setupLayersWidget(mapView);
   // WeatherDaylight.setupWeatherDaylight(mapView);
    MeasurementWidget.setupMeasurementWidget(mapView);
   // LineOfSightWidget.setupLineOfSightWidget(mapView);
    SplashScreen.showSplashScreen(mapView);  // <-- Pass mapView as an argument here
  

  // ... other code

  
});
  
// Global variables
//let activeWidget;
//let actionBarExpanded = false;


// main.js
require([
    "modules/mapConfig",
    "modules/basicWidgets",
    // "modules/weatherDaylight",
   // "modules/measurementWidget",
    // "modules/lineOfSightWidget",
    "modules/splashScreen"
  ], function(
    MapConfig,
    BasicWidgets,
    // WeatherDaylight,
    //MeasurementWidget,
    // LineOfSightWidget,
    SplashScreen
  ) {
    // Initialize the map, widgets, etc.
    const mapView = MapConfig.setupScene(); // Capture the returned mapView
    BasicWidgets.setupBasicWidgets(mapView);
    // WeatherDaylight.setupWeatherDaylight(mapView);
    //MeasurementWidget.setupMeasurementWidget(mapView);
    // LineOfSightWidget.setupLineOfSightWidget(mapView);
    SplashScreen.showSplashScreen(mapView);  // <-- Pass mapView as an argument here
  

    let activePanel = null;

    document.getElementById("basemapsBtn").addEventListener("click", function() {
      togglePanel("basemapsPanel");
    });
    
    document.getElementById("layersBtn").addEventListener("click", function() {
      togglePanel("layersPanel");
    });
    
    document.getElementById("bookmarksBtn").addEventListener("click", function() {
      togglePanel("bookmarksPanel");
    });
    
    // Add other button event listeners here
    
    function togglePanel(panelId) {
      if (activePanel) {
        document.getElementById(activePanel).style.display = "none";
      }
    
      if (activePanel !== panelId) {
        document.getElementById(panelId).style.display = "block";
        activePanel = panelId;
      } else {
        activePanel = null;
      }
    }

});
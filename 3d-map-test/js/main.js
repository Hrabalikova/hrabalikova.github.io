/***********************************
* The main script runnig all the modules
***********************************/
// main.js

require([
    "modules/mapConfig",
    "modules/basicWidgets",
    "modules/slidesWidget",
    "modules/weatherDaylight",
    "modules/measurementWidget",
    "modules/lineOfSightWidget",
    "modules/splashScreen",
    "modules/cameraPosition"
  ], function(
    MapConfig,
    BasicWidgets,
    SlidesWidget,
    WeatherDaylight,
    MeasurementWidget,
    LineOfSightWidget,
    SplashScreen,
    CameraPosition
  ) {
    // Initialize the map, widgets, etc.
    const mapView = MapConfig.setupScene(); // Capture the returned mapView
    BasicWidgets.setupBasicWidgets(mapView); // <-- I have to pass mapView as an argument here
    SlidesWidget.setupSlidesWidget(mapView);
    WeatherDaylight.setupWeatherDaylight(mapView);
    MeasurementWidget.setupMeasurementWidget(mapView);
    LineOfSightWidget.setupLineOfSightWidget(mapView);
    SplashScreen.showSplashScreen(mapView);  
    CameraPosition.setupCameraPosition(mapView); 

    let activePanel = null;

    document.getElementById("basemapsBtn").addEventListener("click", function() {
      togglePanel("basemapsPanel");
    });
    
    document.getElementById("layersBtn").addEventListener("click", function() {
      togglePanel("layersPanel");
    });
    
    document.getElementById("bookmarksBtn").addEventListener("click", function() {
      togglePanel("slidesPanel");
    });

    document.getElementById("searchBtn").addEventListener("click", function() {
      togglePanel("searchPanel");
    });  

// event listener is set up directly in the module, doesnt work it well with switching between different buttons, small issue that needs to be addressed later
// problematic part
/*
    document.getElementById("distanceBtn").addEventListener("click", function() {
        togglePanel("distancePanel");
      });

    document.getElementById("areaBtn").addEventListener("click", function() {
        togglePanel("areaPanel");
    });
*/
    document.getElementById("weatherBtn").addEventListener("click", function() {
        togglePanel("weatherPanel");
      });

    document.getElementById("daylightBtn").addEventListener("click", function() {
        togglePanel("daylightPanel");
    });

    document.getElementById("losBtn").addEventListener("click", function() {
        togglePanel("losPanel");
    });





    // Toggle pannels, except that problematic measurements buttons
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

//   mapView.ui.add("sidebar", "top-right");  //In the case I want that bar floating in the map window, but then again I get trouble with the measurment bar


}); //end of the function

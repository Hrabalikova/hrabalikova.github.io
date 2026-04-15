/***********************************
* Add measurement widget
***********************************/

// author: M.P. - Landmælingar Íslands

define(["esri/widgets/Measurement"], function(Measurement,) {
  return {
    setupMeasurementWidget: function(view) {

// Create new instance of the Measurement widget for distance
const measurementDistance = new Measurement({
  view: view,
});

// Create new instance of the Measurement widget for area
const measurementArea = new Measurement({
  view: view,
})

// Get buttons from html
const distanceButton = document.getElementById('distanceBtn');
const areaButton = document.getElementById('areaBtn');
const clearDistanceButton = document.getElementById('clearDistanceBtn');
const clearAreaButton = document.getElementById('clearAreaBtn');

// Set-up event handlers for buttons and click events
distanceButton.addEventListener("click", () => {
  document.getElementById("distancePanel").appendChild(clearDistanceButton);
  distanceMeasurement();
});

areaButton.addEventListener("click", () => {
  document.getElementById("areaPanel").appendChild(clearAreaButton);
  areaMeasurement();
});

clearDistanceButton.addEventListener("click", () => {
  clearMeasurements();
});

clearAreaButton.addEventListener("click", () => {
  clearMeasurements();
});

// Call the appropriate DistanceMeasurement3D
function distanceMeasurement() {
  view.ui.remove(measurementDistance);
  measurementDistance.activeTool = "direct-line";
  measurementDistance.container = "distance-container";
  view.ui.add(measurementDistance, "distance-container");
  distanceButton.classList.add("active");
  areaButton.classList.remove("active");
}

// Call the appropriate AreaMeasurement3D 
function areaMeasurement() {
  view.ui.remove(measurementArea);
  measurementArea.activeTool = "area";
  measurementArea.container = "area-container";
  view.ui.add(measurementArea, "area-container");
  distanceButton.classList.remove("active");
  areaButton.classList.add("active");
}

// Clears all measurements
function clearMeasurements() {
  distanceButton.classList.remove("active");
  areaButton.classList.remove("active");
  measurementDistance.clear();
  measurementArea.clear();
}
    }
  };
}); //the end of measurementWidgets.js  
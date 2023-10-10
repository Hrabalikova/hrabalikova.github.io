/***********************************
* Add measurement widget
***********************************/
//

define([
  "esri/widgets/DirectLineMeasurement3D",
  "esri/widgets/AreaMeasurement3D",
  "esri/widgets/Expand",
  "esri/core/promiseUtils"
], function(DirectLineMeasurement3D, AreaMeasurement3D, Expand, promiseUtils) {
  return {
    setupMeasurementWidget: function(mapView) {

      let activeWidget = null;

/*      const distance = new DirectLineMeasurement3D({
        view: mapView,
        container: "distance-container"
      });
/*
      const area = new AreaMeasurement3D({
        view: mapView,  
        container: "area-container"
      });
*/

document
.getElementById("distanceBtn")
.addEventListener("click", (event) => {
  setActiveWidget(null);
  if (!event.target.classList.contains("active")) {
    setActiveWidget("distance");
  } else {
    setActiveButton(null);
  }
});

document
.getElementById("areaBtn")
.addEventListener("click", (event) => {
  setActiveWidget(null);
  if (!event.target.classList.contains("active")) {
    setActiveWidget("area");
  } else {
    setActiveButton(null);
  }
});

function setActiveWidget(type) {
switch (type) {
  case "distance":
    activeWidget = new DirectLineMeasurement3D({
      view: mapView,
     // container: "distance-container"
    });

    // skip the initial 'new measurement' button
    activeWidget.viewModel.start().catch((error) => {
      if (promiseUtils.isAbortError(error)) {
        return; // don't display abort errors
      }
      throw error; // throw other errors since they are of interest
    });

    mapView.ui.add(activeWidget, "top-right");
    setActiveButton(document.getElementById("distanceBtn"));
    break;


  case "area":
    activeWidget = new AreaMeasurement3D({
      view: mapView,
      //container:"area-container"
    });

    // skip the initial 'new measurement' button
    activeWidget.viewModel.start().catch((error) => {
      if (promiseUtils.isAbortError(error)) {
        return; // don't display abort errors
      }
      throw error; // throw other errors since they are of interest
    });

    mapView.ui.add(activeWidget, "top-right");
    setActiveButton(document.getElementById("areaBtn"));
    break;
  case null:
    if (activeWidget) {
      mapView.ui.remove(activeWidget);
      activeWidget.destroy();
      activeWidget = null;
    }
    break;
}
}

// add the toolbar for the measurement widgets
function setActiveButton(selectedButton) {
  // focus the view to activate keyboard shortcuts for sketching
  mapView.focus();
  const elements = document.getElementsByClassName("active");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
  if (selectedButton) {
    selectedButton.classList.add("active");
  }
  }
  




    }
  };
});//the end of measurementWidgets.js

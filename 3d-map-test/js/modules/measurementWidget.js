/***********************************
* Add measurement widget
***********************************/
//

define([
  "esri/widgets/DirectLineMeasurement3D",
  "esri/widgets/AreaMeasurement3D",
  "esri/core/promiseUtils"
], function(DirectLineMeasurement3D, AreaMeasurement3D, promiseUtils) {
  return {
    setupMeasurementWidget: function(mapView) {

      const distance = new DirectLineMeasurement3D({
        view: mapView,
        container: "distanceWidgetContainer"
      });

      const area = new AreaMeasurement3D({
        view: mapView,  // Corrected from 'view' to 'mapView'
        container: "areaWidgetContainer"
      });


    }
  };
});

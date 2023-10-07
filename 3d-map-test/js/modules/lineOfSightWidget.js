/**************************************
* LineOfSight widget
**************************************/
//


define([
    "esri/widgets/LineOfSight",
    "esri/geometry/Point",
    "esri/Graphic"
  ], function(LineOfSight, Point, Graphic) {
    return {
      setupLineOfSightWidget: function(mapView) {
        let activeWidget;
        // Code for setting up the line of sight widget

 //add widget and let......
 const lineOfSight = new LineOfSight({
  view: mapView,
  container: "los-container"
});


//Add symbols to mark the intersections for the line of sight
const viewModel = lineOfSight.viewModel;

// watch when observer location changes
viewModel.watch("observer", (value) => {
  setIntersectionMarkers();
});

// watch when a new target is added or removed
viewModel.targets.on("change", (event) => {
  event.added.forEach((target) => {
    setIntersectionMarkers();
    // for each target watch when the intersection changes
    target.watch("intersectedLocation", setIntersectionMarkers);
  });
  event.removed.forEach(() => {
    // remove intersection markers for removed targets (remove with right click on target)
    setIntersectionMarkers();
  });
});

// an inverted cone marks the intersection that occludes the view
const intersectionSymbol = {
  type: "point-3d",
  symbolLayers: [
    {
      type: "object",
      resource: { primitive: "inverted-cone" },
      material: { color: [255, 100, 100] },
      height: 5,
      depth: 5,
      width: 5,
      anchor: "relative",
      anchorPosition: { x: 0, y: 0, z: -0.7 }
    }
  ]
};

function setIntersectionMarkers() {
  mapView.graphics.removeAll();
  viewModel.targets.forEach((target) => {
    if (target.intersectedLocation) {
      const graphic = new Graphic({
        symbol: intersectionSymbol,
        geometry: target.intersectedLocation
      });
      mapView.graphics.add(graphic);
    }
  });
}

// add an Expand widget to make the menu responsive
/*const losExpand = new Expand({
  expandTooltip: "Expand line of sight widget",
  view: mapView,
//  content: document.getElementById("menu"),
  content: new LineOfSight({
    view: mapView,
    content: document.getElementById("menu")
  }),
  group: "top-right",
  container: "widgets",
  expanded: false
});
*/

//mapView.ui.add(losExpand, "top-right");


mapView.when(() => {
  // allow user to turn the layer with new planned buildings on/off
  // and see how the line of sight analysis changes
  const plannedBuildingsLayer = mapView.map.layers //tady bylo puvodne jen view nejsem si uplne jista jestli jsem to zmenila spravne
    .filter((layer) => {
      return (
        layer.title === "Visbility Analysis"
      );
    })
    .getItemAt(0);

  document
    .getElementById("layerVisibility")
    .addEventListener("change", (event) => {
      plannedBuildingsLayer.visible = event.target.checked;
    });
});









      }
    };
  });
  
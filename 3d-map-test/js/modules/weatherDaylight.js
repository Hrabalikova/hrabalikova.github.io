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

        // Code for setting up weather and daylight widgets, adding it to the ui as stand-alone widget
        /*const weatherExpand = new Expand({
            view: mapView,
            expandTooltip: "Expand weather widget",
            content: new Weather({
              view: mapView
            }),
            group: "top-right",
            container: "weather-container", //addet to the container called id=widgets
            expanded: false
          });
        
          const daylightExpand = new Expand({
            view: mapView,
            expandTooltip: "Expand daylight widget",
            content: new Daylight({
              view: mapView
            }),
            group: "top-right",
            container: "daylight-container"
          });
        
          mapView.ui.add([weatherExpand, daylightExpand],"top-right"); // 
        */

        // code get this widget into action bar

        const weather = new Weather({
            view: mapView,
            container: "weather-container", //addet to the container called id=widgets
          });

          document.getElementById('weather-container').addEventListener('click', showLayerList);

         /*map.when(() => {
            let activeWidget;

            const handleActionBarClick = ({ target }) => {
              if (target.tagName !== "CALCITE-ACTION") {
                return;
              }
    
              if (activeWidget) {
                document.querySelector(`[data-action-id=${activeWidget}]`).active = false;
                document.querySelector(`[data-panel-id=${activeWidget}]`).hidden = true;
              }
    
              const nextWidget = target.dataset.actionId;
              if (nextWidget !== activeWidget) {
                document.querySelector(`[data-action-id=${nextWidget}]`).active = true;
                document.querySelector(`[data-panel-id=${nextWidget}]`).hidden = false;
                activeWidget = nextWidget;
              } else {
                activeWidget = null;
              }
            };
    
            document.querySelector("calcite-action-bar").addEventListener("click", handleActionBarClick);
    
            let actionBarExpanded = false;
    
            document.addEventListener("calciteActionBarToggle", event => {
              actionBarExpanded = !actionBarExpanded;
              view.padding = {
                left: actionBarExpanded ? 150 : 49
              };
            });
    
            document.querySelector("calcite-shell").hidden = false;
            document.querySelector("calcite-loader").hidden = true;*/
      });
    };
  });
  
/***********************************
* Load the layers
***********************************/

// author: M.P. - Náttúrufræðistofnun
define([
  "esri/Map",
  "esri/layers/GroupLayer",
  "esri/layers/GeoJSONLayer",
  "esri/layers/SceneLayer",
  "esri/layers/FeatureLayer",
  "esri/layers/WMSLayer",
  "modules/multipointToPoint",
], function (
  Map,
  GroupLayer,
  GeoJSONLayer,
  SceneLayer,
  FeatureLayer,
  WMSLayer,
  MultipointToPoint,
) {
  return {
    setupLayers: function () {

      // Create SceneLayer from a Scene Service URL
      const sceneLayer = new SceneLayer({
        url: "https://basemaps3d.arcgis.com/arcgis/rest/services/OpenStreetMap3D_Buildings_v1/SceneServer",
        title: "OpenStreetMaps 3D Buildings",
        visible: true,
        copyright: "Map data <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors, Microsoft Building Footprints, Scene Layer by ESRI",
      });

      // Load a basemap from https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap-id
      const map = new Map({
        basemap: "satellite",
        ground: "world-elevation",
        layers: [],
      });

      map.ground.navigationConstraint = {
        type: "none"
      };

      map.ground.opacity = 0.8;

      const wallRenderer = {
        type: "simple",
        symbol: {
          type: "line-3d",
          symbolLayers: [
            {
              type: "path",
              profile: "quad",
              material: { color: [92, 64, 51, 0.9] },
              width: 6,
              height: 10,
              anchor: "center",
              cap: "square"
            }
          ]
        }
      };

      async function createMergedVarnargardarLayer() {
        const urls = [
          "https://arcgis.stofa.is/server/rest/services/Hosted/Varnargarðar_við_Grindavík/FeatureServer/1",
          "https://arcgis.stofa.is/server/rest/services/Hosted/Varnargardar_Svartsengi_Grindavik/FeatureServer/1",
          "https://arcgis.stofa.is/server/rest/services/Hosted/Varnargarðar_við_Svartsengi/FeatureServer/0"
        ];

        const allFeatures = [];

        for (const url of urls) {
          const fl = new FeatureLayer({ url });
          await fl.load();
          const result = await fl.queryFeatures({ where: "1=1", outFields: ["*"], returnGeometry: true });
          allFeatures.push(...result.features);
        }

        return new FeatureLayer({
          title: "Varnargarðar",
          source: allFeatures,
          fields: allFeatures[0]?.attributes ? Object.keys(allFeatures[0].attributes).map(name => ({ name, type: "string" })) : [],
          objectIdField: "OBJECTID",
          geometryType: "polyline",
          spatialReference: { wkid: 4326 },
          renderer: wallRenderer,
          elevationInfo: { mode: "relative-to-ground" },
          listMode: "show",
          popupEnabled: false
        });
      }

      const samgongurLayer = new WMSLayer({
        url: "https://gis.natt.is/geoserver/IS_50V/wms?service=WMS&version=1.1.0",
        title: "Samgöngur línur",
        copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        listMode: "hide-children", // 🔧 hides nested sublayer structure
        sublayers: [
          {
            name: "IS_50V:samgongur_linur",
            title: "Samgöngur línur",
            visible: true
          }
        ]
      });

      createMergedVarnargardarLayer().then(mergedLayer => {
        const innvidirGroup = new GroupLayer({
          title: "Innviðir",
          visibilityMode: "independent",
          layers: [
            samgongurLayer,
            sceneLayer,
            mergedLayer
          ]
        });
        map.add(innvidirGroup);
      });


      const preferredTitle = ""; // your preferred image title if not the last image
      const wmsURL = "https://gis.natt.is/mapcache/reykjaneseldar/web-mercator/wms?service=WMS&version=1.1.0";
      const wmsMain = new WMSLayer({ url: wmsURL });

      wmsMain.load().then(() => {
        const sublayers = wmsMain.allSublayers
          .filter(s => !s.sublayers && !s.name.toLowerCase().includes("dem"));

        const sublayersWithDates = sublayers.map(s => {
          const name = s.name;
          const title = s.title || name || "Untitled";
          const dateMatch = title.match(/\d{4}-\d{2}-\d{2}/);
          const date = dateMatch ? new Date(dateMatch[0]) : new Date(0);
          return { name, title, date };
        });

        // Sort newest first
        sublayersWithDates.sort((a, b) => b.date - a.date);

        // Find preferred layer
        const preferredIndex = sublayersWithDates.findIndex(s => s.title === preferredTitle);
        const visibleIndex = preferredIndex >= 0 ? preferredIndex : 0;

        const layers = sublayersWithDates.map((entry, i) => {
          return new WMSLayer({
            url: wmsURL,
            title: entry.title,
            visible: i === visibleIndex,
            sublayers: [{
              name: entry.name,
              title: entry.title,
              visible: true,
              listMode: "hide"
            }]
          });
        });

        const myndirGroup = new GroupLayer({
          title: "Myndir",
          visible: true,
          visibilityMode: "independent",
          copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
          layers: layers
        });

        map.add(myndirGroup, 1);
      }).catch(console.error);

      // Hæðargögn og Kortar
      const wmsMaps = new WMSLayer({
        url: "https://gis.natt.is/mapcache/web-mercator/wms?service=WMS&version=1.1.0",
        title: "Hæðargögn og Kortar",
        copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        visible: false,
        sublayers: [{
          name: "LMI_Kort", // Layer to filter out from WMS
          title: "LMI Kort", // title for in legend
          visible: true,
          copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        }, // Url for legend image as png
        {
          name: "DEM", // Layer to filter out from WMS
          title: "IslandsDEM", // title for in legend
          visible: false,
          copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        }, // Url for legend image as png
        {
          name: "IslandsDEMDaylight", // Layer to filter out from WMS
          title: "IslandsDEM Daylight", // title for in legend
          visible: true,
          copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        }, // Url for legend image as png
        ]
      });
      map.add(wmsMaps, 0)


      // Vöktun
      const skjalftarLayer = new FeatureLayer({
        url: "https://luk.vedur.is/arcgis/rest/services/skjalftar/skjalftar_isn93/FeatureServer/0",
        title: "Skjálftar 3D",
        copyright: "<a href='https://vedur.is'>Veðurstofa Íslands</a>",
        outFields: ["*"],
        visible: true,
        opacity: 0.8,

        // Make the points appear underground using the depth field
        elevationInfo: {
          mode: "absolute-height",
          featureExpressionInfo: {
            expression: "$feature.depth * -1000"// -1000"  // convert km to meters and invert (deeper = lower Z)
          }
        },

        // Use visual variables for mag (size) and time_elapsed (color)
        renderer: {
          type: "simple",
          symbol: {
            type: "point-3d",
            symbolLayers: [{
              type: "object",
              resource: { primitive: "sphere" },
              material: { color: "red" },
              width: 500,
              height: 500,
              depth: 500
            }]
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "$feature.mag * $feature.mag * 30",
              valueExpressionTitle: "Stærð = mag"
            },
            {
              type: "color",
              field: "time_elapsed",
              stops: [
                { value: 6, color: "#440154" },   // deep purple
                { value: 5, color: "#414487" },   // dark blue
                { value: 4, color: "#2a788e" },   // blue-green
                { value: 3, color: "#22a884" },   // green
                { value: 2, color: "#7ad151" },   // yellow-green
                { value: 1, color: "#fde725" },    // yellow
                { value: 0, color: "#d1293b" }    // red
              ],
              legendOptions: {
                title: "Tími frá skjálfta (klst)"
              }
            }
          ]
        },

        // Show attributes in the popup
        popupTemplate: {
          title: "Jarðskjálfti (mag {mag})",
          content: `
                          <b>Staðsetning:</b> {lat}, {lng}<br/>
                          <b>Dýpi:</b> {depth} km<br/>
                          <b>Stærð:</b> {mag}<br/>
                          <b>Tími:</b> {start_time}<br/>
                          <b>Fyrir:</b> {time_elapsed} klst<br/>
                          <b>Hlutfallslega fyrir:</b> {hrs_relative} klst<br/>
                          <b>Dags/Tími:</b> {datetime}
                        `
        }
      });
      //map.add(skjalftarLayer);

      const skjalftarGroundLayer = new FeatureLayer({
        url: "https://luk.vedur.is/arcgis/rest/services/skjalftar/skjalftar_isn93/FeatureServer/0",
        title: "Skjálftar – shadows",  // Ground projection
        copyright: "<a href='https://vedur.is'>Veðurstofa Íslands</a>",
        outFields: ["*"],
        visible: true,
        opacity: 1, // Slightly transparent

        elevationInfo: {
          mode: "on-the-ground"
        },

        renderer: {
          type: "simple",
          symbol: {
            type: "simple-marker",
            style: "circle",
            color: "red",
            size: 1,
            outline: {
              color: "white",
              width: 0.5
            }
          },
          visualVariables: [
            {
              type: "size",
              valueExpression: "$feature.mag * $feature.mag * 2",
              valueExpressionTitle: "Stærð = mag"
            },
            {
              type: "color",
              field: "time_elapsed",
              stops: [
                { value: 6, color: "#440154" },   // deep purple
                { value: 5, color: "#414487" },   // dark blue
                { value: 4, color: "#2a788e" },   // blue-green
                { value: 3, color: "#22a884" },   // green
                { value: 2, color: "#7ad151" },   // yellow-green
                { value: 1, color: "#fde725" },    // yellow
                { value: 0, color: "#d1293b" }    // red
              ],
              legendOptions: {
                title: "Tími frá skjálfta (mín)"
              }
            }
          ]
        },

        // Show attributes in the popup
        popupTemplate: {
          title: "Jarðskjálfti (mag {mag})",
          content: `<b>Staðsetning:</b> {lat}, {lng}<br/>
                    <b>Dýpi:</b> {depth} km<br/>
                    <b>Stærð:</b> {mag}<br/>
                    <b>Tími:</b> {start_time}<br/>
                    <b>Fyrir:</b> {time_elapsed} klst<br/>
                    <b>Hlutfallslega fyrir:</b> {hrs_relative} klst<br/>
                    <b>Dags/Tími:</b> {datetime}`
        }
      });

      //map.add(skjalftarGroundLayer);

      const skjalftarGroupLayer = new GroupLayer({
        title: "Skjálftar (síðustu 6 klst)",
        visible: true,
        visibilityMode: "inherited", // all sublayers follow group's visibility
        minScale: 2000000,
        layers: [skjalftarLayer, skjalftarGroundLayer]
      });

      const hraunUtlinurLayer = new WMSLayer({
        url: "https://gis.natt.is/geoserver/wms",
        title: "Hraun útlínur",
        copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        listMode: "hide-children",
        opacity: 0.2,
        visible: false,
        sublayers: [
          {
            name: "LMI_vektor:goslok_reykjaneselda",
            title: "Hraun útlínur",
            copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
            visible: true,
            styles: "LMI_vektor:goslok_einnlitur"
          }
        ]
      });

      const haettusvaediLayer = new WMSLayer({
        url: "https://gis.natt.is/geoserver/wms",
        title: "Hættusvæði",
        listMode: "hide-children",
        opacity: 0.8,
        visible: false,
        sublayers: [
          {
            name: "LMI_vektor:gos_reykjanes_hazard_zones_nyjast",
            title: "Hættusvæði",
            copyright: "<a href='https://vedur.is'>Veðurstofa Íslands</a> & <a href='https://www.natt.is'>Náttúrufræðistofnun</a> & <a href='https://www.almannavarnir.is'>Almannavarnir</a>",
            visible: true
          }
        ]
      });

      const webcamLayer = new GeoJSONLayer({
        url: "https://gis.natt.is/geoserver/LMI_vektor/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=LMI_vektor:gos_Reykjanes_webcams&outputFormat=application/json",
        title: "Vöktunarmyndavélar",
        copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        elevationInfo: { mode: "relative-to-ground" },
        outFields: ["*"],
        renderer: {
          type: "simple",
          symbol: {
            type: "point-3d",
            symbolLayers: [
              {
                // Cone (camera head)
                type: "object",
                resource: { primitive: "cone" },
                height: 50,
                width: 30,
                depth: 30,
                anchor: "bottom",
                anchorPosition: { x: 0, y: 0, z: 0 }, // sits at top of mast
                material: { color: "violet" }
              }
            ]
          },
        },
        popupTemplate: {
          title: "{name}",
          content: (feature) => {
            const url = feature.graphic.attributes.images_uri;
            let videoId = "";

            // Extract video ID from YouTube URL
            if (url.includes("watch?v=")) {
              videoId = url.split("watch?v=")[1];
            } else if (url.includes("youtu.be/")) {
              videoId = url.split("youtu.be/")[1];
            }

            const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
            return `
              <b>Beint streymi:</b><br>
              <a href="${url}" target="_blank" rel="noopener">
                <img src="${thumbnail}" style="max-width:100%; border:1px solid #ccc;" alt="Thumbnail" /><br>
                ▶ Horfa núna
              </a>
            `;
          }
        }
      });

      const GosopLayer = new WMSLayer({
        url: "https://gis.natt.is/geoserver/wms",
        title: "Gosop",
        copyright: "<a href='https://www.natt.is'>Náttúrufræðistofnun</a>",
        listMode: "hide-children",
        visible: false,
        sublayers: [{
          name: "LMI_vektor:gos_Reykjanes_hraun_lava_vents",
          title: "Gosop",
          styles: "LMI_vektor:gosop_eftir_virkni"
        }]
      });

      const sprungurLayer = new WMSLayer({
        url: "https://wms.eflamap.is/?public",
        title: "Sprungur (EFLA)",
        copyright: "<a href='https://www.efla.is'>EFLA</a>",
        listMode: "hide-children",
        visible: false,
        sublayers: [{
          name: "grindavik:umbrot_sprungur",
          title: "Grindavík: Sprungur",
          styles: "grindavik:grindavik_sprungur_style",
          legendUrl: "https://wms.eflamap.is?public&service=WMS&version=1.3.0&request=GetLegendGraphic&format=image/png&layer=grindavik:umbrot_sprungur"
        }]
      });

      const faultsSprungurLayer = new WMSLayer({
        url: "https://gis.natt.is/geoserver/LMI_vektor/wms",
        title: "Sprungur (Nátt)",
        copyright: "<a href='https://www.natt.is'>Náttúrufræðistofnun</a>",
        listMode: "hide-children",
        visible: false,
        sublayers: [
          {
            name: "LMI_vektor:gos_Reykjanes_faults",
            title: "Sprungur",
          }
        ]
      });

      const fyllingarLayer = new WMSLayer({
        url: "https://wms.eflamap.is/?public",
        title: "Fyllingar í sprungur",
        copyright: "<a href='https://www.efla.is'>EFLA</a>",
        listMode: "hide-children",
        visible: false,
        sublayers: [{
          name: "grindavik:fyllingar_sprungur",
          title: "Fyllingar í sprungur",
          styles: "grindavik:grindavik_fyllingar_style",
          legendUrl: "https://wms.eflamap.is?public&service=WMS&version=1.3.0&request=GetLegendGraphic&format=image/png&layer=grindavik:fyllingar_sprungur"
        }]
      });
      
      const voktunGroup = new GroupLayer({
        title: "Vöktun",
        visibilityMode: "independent",
        visible: true,
        copyright: "<a href='https://vedur.is'>Veðurstofa Íslands</a> & <a href='https://www.natt.is'>Náttúrufræðistofnun</a>",
        layers: [
          skjalftarGroupLayer,
          haettusvaediLayer,
          GosopLayer,
          hraunUtlinurLayer,
          sprungurLayer,
          faultsSprungurLayer,
          fyllingarLayer,
          webcamLayer]
      });

      map.add(voktunGroup);

      function getTimeExtentForLast10Minutes() {
        const end = new Date();
        end.setUTCMinutes(Math.floor(end.getUTCMinutes() / 10) * 10);
        end.setUTCSeconds(0);
        end.setUTCMilliseconds(0);

        const start = new Date(end.getTime() - 10 * 60 * 1000); // subtract 10 minutes
        return { start, end };
      }

      // Clouds when zooming out (hidden layer)
      const eumetsatLayer = new WMSLayer({
        url: "https://view.eumetsat.int/geoserver/wms",
        title: "EUMETSAT Imagery Live",
        copyright: "<a href='http://www.eumetsat.int'>EUMETSAT</a>",
        sublayers: [
          {
            name: "mtg_fd:rgb_geocolour",
            title: "EUMETSAT RGB GeoColour"
          },
          {
            name: "backgrounds:ne_10m_coastline",
            title: "Coastline"
          }
        ],
        timeExtent: getTimeExtentForLast10Minutes(),
        useViewTime: false, // Let the layer handle the timeExtent itself
        maxScale: 2000000,
        opacity: 0.8,
        // 🔒 Hide from LayerList
        listMode: "hide"
      });

      map.add(eumetsatLayer);

      // ⏱️ Automatically update every 10 minutes (600000 ms)
      setInterval(() => {
        const { start, end } = getTimeExtentForLast10Minutes();
        eumetsatLayer.timeExtent = { start, end };
        console.log("Updated time extent:", start.toISOString(), "-", end.toISOString());
      }, 600000); // 600000 ms = 10 minutes

      // Örnefni
      // Define a renderer that displays only the text labels
      const ornefniFlakar = new GeoJSONLayer({
        url: "https://gis.natt.is/geoserver/IS_50V/ornefni_flakar/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_flakar&outputFormat=json",
        copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        visible: true,
        editable: false,
        title: "Örnefni flakar",
        elevationInfo: { mode: "on-the-ground" },
        renderer: {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol: {
            type: "polygon-3d", // autocasts as new PolygonSymbol3D()
            symbolLayers: [
              {
                type: "fill", // autocasts as new FillSymbol3DLayer()
                material: {
                  color: [255, 255, 255, 0.2], // Set the color of the polygons
                },
                outline: {
                  color: "black", // Set the outline color of the polygons
                  size: 0.5 // Set the outline size of the polygons
                }
              }
            ]
          }
        },
        outFields: ["*"],
        // Add labels with callouts of type line to the icons
        labelingInfo: [
          {
            // When using callouts on labels, "above-center" is the only allowed position
            labelPlacement: "above-center",
            labelExpressionInfo: {
              value: "{ornefni}"
            },
            symbol: {
              type: "label-3d", // autocasts as new LabelSymbol3D()
              symbolLayers: [
                {
                  type: "text", // autocasts as new TextSymbol3DLayer()
                  material: {
                    color: "black"
                  },
                  halo: {
                    color: [255, 255, 255, 0.7],
                    size: 2
                  },
                  size: 10
                }
              ],
              // Labels need a small vertical offset that will be used by the callout
              verticalOffset: {
                screenLength: 50,
                maxWorldLength: 2000,
                minWorldLength: 30
              },
              // The callout has to have a defined type (currently only line is possible)
              // The size, the color and the border color can be customized
              callout: {
                type: "line", // autocasts as new LineCallout3D()
                size: 0.5,
                color: [0, 0, 0],
                border: {
                  color: [255, 255, 255, 0.7]
                }
              }
            }
          }
        ]
      });

      // Örnefni línur
      const ornefniLinur = new GeoJSONLayer({
        url: "https://gis.natt.is/geoserver/IS_50V/ornefni_linur/wfs?request=GetFeature&service=WFS&version=1.1.0&typeName=IS_50V:ornefni_linur&outputFormat=json",
        copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        visible: true,
        editable: false,
        title: "Örnefni línur",
        elevationInfo: { mode: "on-the-ground" },
        renderer: {
          type: "simple",
          symbol: {
            type: "line-3d",
            symbolLayers: [
              {
                type: "line",
                material: {
                  color: [0, 0, 0, 0.7] // Set the color of the lines
                },
                size: 3 // Set the size of the lines (thicker line)
              },
              {
                type: "line", // Define the symbol layer type as line
                material: {
                  color: [255, 255, 255, 0.7] // Set the color of the lines
                },
                size: 2, // Set the size of the lines
              }
            ]
          }
        },
        outFields: ["*"],
        // Add labels with callouts of type line to the icons
        labelingInfo: [
          {
            // When using callouts on labels, "above-center" is the only allowed position
            labelPlacement: "above-center",
            labelExpressionInfo: {
              value: "{ornefni}"
            },
            symbol: {
              type: "label-3d", // autocasts as new LabelSymbol3D()
              symbolLayers: [
                {
                  type: "text", // autocasts as new TextSymbol3DLayer()
                  material: {
                    color: "black"
                  },
                  halo: {
                    color: [255, 255, 255, 0.7],
                    size: 2
                  },
                  size: 10
                }
              ],
              // Labels need a small vertical offset that will be used by the callout
              verticalOffset: {
                screenLength: 50,
                maxWorldLength: 2000,
                minWorldLength: 30
              },
              // The callout has to have a defined type (currently only line is possible)
              // The size, the color and the border color can be customized
              callout: {
                type: "line", // autocasts as new LineCallout3D()
                size: 0.5,
                color: [0, 0, 0],
                border: {
                  color: [255, 255, 255, 0.7]
                }
              }
            }
          }
        ]
      });

      // Create a GroupLayer to contain örnefni
      const ornefniLayer = new GroupLayer({
        title: "Örnefni",
        copyright: "<a href='https://www.natt.is/'>Náttúrufræðistofnun</a>",
        visible: false,
        editable: false,
        layers: [ornefniFlakar, ornefniLinur],
      });

      // Örnefni punktar
      MultipointToPoint.convertToPoint(map, ornefniLayer);
      map.add(ornefniLayer, 3)

      return map;
    }
  };
});

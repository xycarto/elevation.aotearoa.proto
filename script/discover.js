
function insert() { 
    $('body').append('<div class="top"><a href="index.html">Elevation Aotearoa</a></div>');
    $('body').append('<div class="menu"></div>'); 
    $('body').append('<div class="left"></div>'); 
        $('.left').append('<div class="left-title">Please Choose a Layer from the Layer Selector (Top Right of Map)</div>'); 
        $('.left').append('<div class="left-data">left data</div>');
    $('body').append('<div id="map"></div>'); 
    $('.menu').append('<div class="menuitem"><a href="discover.html">Discover Data</a></div>');
    $('.menu').append('<div class="menuitem"><a href="stories.html">Our Stories</a></div>');
    $('.menu').append('<div class="menuitem"><a href="learn.html">Learn</a></div>');
    $('.menu').append('<div class="menuitem"><a href="connect.html">Connect</a></div>');
    $('.menu').append('<div class="menuitem"><a href="about.html">About</a></div>');

//Begin vector tiles

//Vector Tiles: Available
//layer url
var urlVectorAvailable = "https://xycarto.github.io/vectortile-repo/available_now/{z}/{x}/{y}.pbf";

var stylesStartAvailable = {
    interactive: true,
    getFeatureID: function(f) {
      return f.layer.properties;
    },
    vectorTileLayerStyles: {
      'LiDAR_available_now': function(properties,zoom) {
          var level = map.getZoom();
          var weight = 0.5;
          if (level >= 8) {weight = 1.5;}
          return {
            weight: weight,
            opacity: 1,
            color: "#d677d6",
            fillColor: "#e4a5e4",
            fillOpacity: 0.75,
            fill: true
          }
    }}
};

//add functionality to vector layer Available
var vectorAvailable = L.vectorGrid.protobuf(urlVectorAvailable, stylesStartAvailable)
.on('click', function(e) {
var popupName = '<h3 style="text-align: center;">' + e.layer.properties.name + '</h3>';
var popupDensity = '<div id="popUpText"><strong>Point Density: </strong>' + e.layer.properties.point_dens + '</div>';
var popupVertical = '<div id="popUpText"><strong>Vertical Datum: </strong>' + e.layer.properties.vertical_d + '</div>';
var popupHorizontal = '<div id="popUpText"><strong>Horizontal Datum: </strong>' + e.layer.properties.horizontal + '</div>';
var popupSupplier = '<div id="popUpText"><strong>Supplier: </strong>' + e.layer.properties.supplier + '</div>';
var popupFlownFrom = '<div id="popUpText"><strong>Flown From: </strong>' + e.layer.properties.flown_from + '</div>';
var popupFlownTo = '<div id="popUpText"><strong>Flown To: </strong>' + e.layer.properties.flown_to + '</div>';
var popupGetData = '<div id="popUpText"><strong>Get Data: </strong>' + '<ul><li><a href="' + e.layer.properties.DataDEM + '" target="_blank">Digital Elevation Model(DEM)</a></li><li><a href="'+ e.layer.properties.DataDSM + '" target="_blank">Digital Surface Model(DSM)</a></li><li><a href="' + e.layer.properties.DataPointC+ '" target="_blank">Point Cloud(LAS)</a></li></ul></div>';
$("#sp-head").text(e.layer.properties.name);
$("#fill-items").text(e.layer.properties.point_dens, e.layer.properties.vertical_d);
    L.popup()
      .setContent(popupName + popupDensity + popupVertical + popupHorizontal + popupSupplier + popupFlownFrom + popupFlownTo+ popupGetData)
      .setLatLng(e.latlng)
      .openOn(map);
})
.on("mouseover", function(e) {
  e.layer.setStyle({
    fillColor: "yellow"
  })
})
.on("mouseout", function(e) {
  e.layer.setStyle({
    //weight: weight,
    opacity: 1,
    color: "#d677d6",
    fillColor: "#e4a5e4",
    fillOpacity: 0.75,
    fill: true
  });
});



//Build Basemap    
    var settingsBasemap = {
        maxZoom: 19, 
        attribution: '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>', //Simple attribution for linz
    };

    var settingsControl = {
        collapsed: false
        };
        
    //Base map
    var basemap = new L.TileLayer('https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png', settingsBasemap)

    // Layer control
    var basemaps = {
    "LINZ Colour Base Map": basemap
    };

    var overlays = {
        "Available Now": vectorAvailable,
        //"Coming Soon": vectorComingSoon,
        //"In Progress": vectorInProgress
      };
    //end layer control
        
    //build all maps
    var map = new L.Map('map',
         {center: [-39.9, 175.2], 
         zoom: 6,
         layers: basemap
        }); 

    var control = L.control.layers(basemaps, overlays, settingsControl).addTo(map);

    map.on('overlayadd', function (e) {
        if (e.name === 'Available Now') {
          $(".left-title").text("Available Data")
          $.getJSON("metadata.json", { get_param: 'value' }, function(data) {
              $.each(JSON.parse(data.json), function(i, items){console.log(items.layers)
                });
                //$(".left-data").text(parsed.name);
        })
          $(".left-data").empty()
        }
        else if (e.name === 'Coming Soon') {
          $(".left-title").text("Coming Soon")
          $(".left-data").empty()
        }
        else if (e.name === 'In Progress') {
          $(".left-title").text("In Progress")
          $(".left-data").empty()
        }
      });
      
      map.on('overlayremove', function (e) {
        if (e.name === 'Available Now') {
          $(".left-title").text("Please Choose a Layer from the Layer Selector (Top Right of Map)")
          $(".left-data").empty()
        }
        else if (e.name === 'Coming Soon') {
          $(".left-title").empty()
          $(".left-data").empty()
        }
        else if (e.name === 'In Progress') {
          $(".left-title").empty()
          $(".left-data").empty()
        }
      });


    map.addLayer(map);

};


    


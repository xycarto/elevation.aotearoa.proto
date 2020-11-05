
function insert() { 

  $('body').append('<div class="alldiv"></div>');       
    $('.alldiv').append('<div class="top"></div>');
        $('.top').append('<div class="menuitem-index"><a href="index.html"><span>Elevation Aotearoa</span></a></div>');
        $('.top').append('<div class="menuitem"><a href="discover.html"><span>Find Data</span></a></div>');
        $('.top').append('<div class="menuitem"><span><a href="learn.html">Learn</a></span></div>');
        $('.top').append('<div class="menuitem"><span><a href="connect.html">Connect</a></span></div>');
        $('.top').append('<div class="menuitem"><span><a href="about.html">About</a></span></div>');
    $('.alldiv').append('<div class="landboxframe"></div>');
        $('.landboxframe').append('<div class="left"></div>'); 
              $('.left').append('<div class="left-title">Please Choose a Layer from the Layer Selector (Top Right of Map)</div>'); 
              $('.left').append('<div class="left-data">Some description will go here</div>');
        $('.landboxframe').append('<div id="map"></div>'); 
  
  
  
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
  var baseMapIndex = {
      "LINZ Colour Base Map": basemap
      };
  
  //end layer control
          
  //build all maps
  var map = new L.Map('map',
           {center: [-39.9, 175.2], 
           zoom: 6,
           layers: basemap
          });
  
  
  var availBaseStyle = {
            fillColor: "#000000",
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
  }
  
  var rolloverPoly = {
    fillColor: "yellow",
    color: 'white',
    fillOpacity: 0.7
  }
  
  var settingsControl = {
    collapsed: false
    };
       
  var url = 'https://xycarto.github.io/vectortile-repo/LiDAR_available_now_fix.json';
  
  /*function onEachFeature(overlay) {
    overlay.on('click', function(){
      console.log("click");
    });
  }*/
  
  function createOverlay(data, layerName, availBaseStyle) {
    var overlay = L.geoJson(data, availBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
    }
    });// Add the data to the map
    control.addOverlay(overlay, layerName, settingsControl); // Add the layer to the Layer Control.
    overlay.on('click', function(e){
      console.log(e.layer.feature.properties.name)
      $(".left-data").empty();
      $(".left-data").append(e.layer.feature.properties.name);
    }) // add get information
    overlay.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlay.on('mouseout', function(e){
      e.layer.setStyle(availBaseStyle)
    })
    overlay.addEventListener('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    }, true)
  }
  
  $.getJSON(url, function (data) { createOverlay(data, "Available Now", availBaseStyle)});
  
  var control = L.control.layers(baseMapIndex).addTo(map);
  
  control.addTo(map);
  
  //Map Functions
  
  map.on('overlayadd', function (e) {
    if (e.name === 'Available Now') {
      $(".left-title").text("Available Data")
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
  
  
  
  };
  
  
      
  
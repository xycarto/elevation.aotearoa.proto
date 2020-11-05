
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
              $('.left').append('<div class="left-title">Elevation Data Finder</div>'); 
              $('.left').append('<div class="left-data"</div>');
              $('.left-data').append('<div class="left-data-title">Title</div>');
              $('.left-data').append('<div class="left-data-datasets"><p>Elevation Data Finder provides you with ease of access to information on all current and future open elevation datasets in New Zealand.</p></div>');
              $('.left-data').append('<div class="left-data-meta">Metadata</div>');
              $('.left').append('<div class="left-bottom">New to this map? Take a quick tour</div>');
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

  var comingBaseStyle = {
    fillColor: "#0ff000",
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  }

  var progressBaseStyle = {
    fillColor: "#002580",
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
       
  var urlAvailable = 'https://xycarto.github.io/vectortile-repo/LiDAR_available_now_fix.json';

  var urlComingSoon = 'https://xycarto.github.io/vectortile-repo/ComingSoon_fix.json';  

  var urlProgress = 'https://xycarto.github.io/vectortile-repo/InProgress_fix.json'; 

  //Load Available Now layer
  function createOverlay(data, layerName, availBaseStyle) {
    var overlayA = L.geoJson(data, availBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
    }
    });// Add the data to the map
    control.addOverlay(overlayA, layerName, settingsControl); // Add the layer to the Layer Control.
    overlayA.on('click', function(e){
      console.log(e.layer.feature.properties.name)
      $(".left-data").empty();
      $(".left-data").append(e.layer.feature.properties.name);
    }) // add get information
    overlayA.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayA.on('mouseout', function(e){
      e.layer.setStyle(availBaseStyle)
    })
    //overlayA.addEventListener('mouseover', function(e){
      //e.layer.setStyle(rolloverPoly)
    //}, true)
  }
  
  $.getJSON(urlAvailable, function (data) { createOverlay(data, "Available Now", availBaseStyle)});

  //Load Coming Soon layer/*
  function createOverlay(data, layerName, comingBaseStyle) {
    var overlayC = L.geoJson(data, comingBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
    }
    });// Add the data to the map
    control.addOverlay(overlayC, layerName, settingsControl); // Add the layer to the Layer Control.
    overlayC.on('click', function(e){
      console.log(e.layer.feature.properties.name)
      $(".left-data").empty();
      $(".left-data").append(e.layer.feature.properties.name);
    }) // add get information
    overlayC.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayC.on('mouseout', function(e){
      e.layer.setStyle(comingBaseStyle)
    })
    overlayC.addEventListener('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    }, true)
  }
  
  $.getJSON(urlComingSoon, function (data) { createOverlay(data, "Coming Soon", comingBaseStyle)});

  //Load In Progress layer
  function createOverlay(data, layerName, progressBaseStyle) {
    var overlayP = L.geoJson(data, progressBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
    }
    });// Add the data to the map
    control.addOverlay(overlayP, layerName, settingsControl); // Add the layer to the Layer Control.
    overlayP.on('click', function(e){
      console.log(e.layer.feature.properties.name)
      $(".left-data").empty();
      $(".left-data").append(e.layer.feature.properties.name);
    }) // add get information
    overlayP.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayP.on('mouseout', function(e){
      e.layer.setStyle(progressBaseStyle)
    })
    //overlayA.addEventListener('mouseover', function(e){
      //e.layer.setStyle(rolloverPoly)
    //}, true)
  }
  
  $.getJSON(urlProgress, function (data) { createOverlay(data, "In Progress", progressBaseStyle)});
  
  //Add Layer Control
  var control = L.control.layers(baseMapIndex).addTo(map);
  
  control.addTo(map);
  
  //Map Functions
  
  map.on('overlayadd', function (e) {
    if (e.name === 'Available Now') {
      $(".left-data-meta").append('<div class="left-data-meta-avail"></div>')
      $(".left-data-meta-avail").text("Available Data")
    }
    else if (e.name === 'Coming Soon') {
      $(".left-data-meta").append('<div class="left-data-meta-coming"></div>')
      $(".left-data-meta-coming").text("Coming Soon")
    }
    else if (e.name === 'In Progress') {
      $(".left-data-meta").append('<div class="left-data-meta-progress"></div>')
      $(".left-data-meta-progress").text("In Progress")
    }
  });
  
  map.on('overlayremove', function (e) {
    if (e.name === 'Available Now') {
      $(".left-data-meta-avail").remove()
    }
    else if (e.name === 'Coming Soon') {
      $(".left-data-meta-coming").remove()
    }
    else if (e.name === 'In Progress') {
      $(".left-data-meta-progress").remove()
    }
  });
  
  
  
  };
  
  
      
  

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
              $('.left').append('<div class="left-data"></div>');
                $('.left-data').append('<div class="left-data-title">Title</div>');
                $('.left-data').append('<div class="left-data-datasets"><p>Elevation Data Finder provides you with ease of access to information on all current and future open elevation datasets in New Zealand.</p></div>');
                $('.left-data').append('<div class="left-data-meta"></div>');
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
  function createOverlayA(data, layerName, availBaseStyle) {
    var overlayA = L.geoJson(data, availBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
      }
    });// Add the data to the map
    control.addOverlay(overlayA, layerName, settingsControl); // Add the layer to the Layer Control.
    overlayA.on('click', function(e){
      //console.log(e.layer.feature.properties.name)
      $(".left-data-datasets").empty();
      $(".left-data-title").empty();
      $(".left-data-meta").empty();
      $(".left-data-title").append(e.layer.feature.properties.name);
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

  var availableList = [];
  function getListA(data){
    console.log(data);
    $.each(data.features, function(i, result){
      availableList.push('<li>'+ result.properties.name + '</li>')
      //console.log(result.properties.name)
    })
  }
  console.log(availableList)
  
  $.getJSON(urlAvailable, function (data) { 
    createOverlayA(data, "Available Now", availBaseStyle)
  }).done(function (data) {
    getListA(data);
  });

  //Load Coming Soon layer/*
  function createOverlayC(data, layerName, comingBaseStyle) {
    var overlayC = L.geoJson(data, comingBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
    }
    });// Add the data to the map
    control.addOverlay(overlayC, layerName, settingsControl); // Add the layer to the Layer Control.
    overlayC.on('click', function(e){
      //console.log(e.layer.feature.properties.name)
      $(".left-data-datasets").empty();
      $(".left-data-title").empty();
      $(".left-data-meta").empty();
      $(".left-data-title").append(e.layer.feature.properties.Region);
    }) // add get information
    overlayC.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayC.on('mouseout', function(e){
      e.layer.setStyle(comingBaseStyle)
    })
  }

  var comingList = [];
  function getListC(data){
    //console.log(data);
    $.each(data.features, function(i, result){
      comingList.push('<li>'+ result.properties.Region + '</li>')
      //console.log(result.properties.Region)
    })
  }
  
  $.getJSON(urlComingSoon, function (data) { 
    createOverlayC(data, "Coming Soon", comingBaseStyle)
  })
  .done(function (data) {
    getListC(data);
  });

  //Load In Progress layer
  function createOverlayP(data, layerName, progressBaseStyle) {
    var overlayP = L.geoJson(data, progressBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
      }
    });// Add the data to the map
    control.addOverlay(overlayP, layerName, settingsControl); // Add the layer to the Layer Control.
    overlayP.on('click', function(e){
      //console.log(e.layer.feature.properties.name)
      $(".left-data-datasets").empty();
      $(".left-data-title").empty();
      $(".left-data-meta").empty();
      $(".left-data-title").append(e.layer.feature.properties.Region);
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

  var progressList = [];
  function getListP(data){
    //console.log(data);
    $.each(data.features, function(i, result){
      progressList.push('<li>'+ result.properties.Region + '</li>')
      //console.log(result.properties.Region)
    })
  }
  
  $.getJSON(urlProgress, function (data) { 
    createOverlayP(data, "In Progress", progressBaseStyle)
  })
  .done(function (data) {
    getListP(data);
  });
  
  //Add Layer Control
  var control = L.control.layers(baseMapIndex).addTo(map);
  
  control.addTo(map);
  
  //Map Legend Click Functions  
  map.on('overlayadd', function (e) {
    if (e.name === 'Available Now') {
      $(".left-data-datasets").empty();
      $(".left-data-title").empty();           
      $(".left-data-meta").append('<div class="left-data-meta-avail"></div>')
        $(".left-data-meta-avail").append('<a href="#" id="menu-icon-a"></a><div class="left-data-meta-avail-title">Available Now<ul class="a">' + availableList + '</ul></div>')
        $(".left-data-meta-avail").ready(function() {
          $('#menu-icon-a').click(function() {
            $('.left-data-meta-avail-title ul.a').toggleClass('visible');
          });
        });
    }
    else if (e.name === 'Coming Soon') {
      $(".left-data-datasets").empty();
      $(".left-data-title").empty(); 
      $(".left-data-meta").append('<div class="left-data-meta-coming"></div>')
        $(".left-data-meta-coming").append('<a href="#" id="menu-icon-c"></a><div class="left-data-meta-coming-title">Coming Soon<ul class="c">' + comingList + '</ul></div>')
        $(".left-data-meta-coming").ready(function() {
          $('#menu-icon-c').click(function() {
            $('.left-data-meta-coming-title ul.c').toggleClass('visible');
          });
        });
    }
    else if (e.name === 'In Progress') {
      $(".left-data-datasets").empty();
      $(".left-data-title").empty(); 
      $(".left-data-meta").append('<div class="left-data-meta-progress"></div>')
      $(".left-data-meta-progress").append('<a href="#" id="menu-icon-p"></a><div class="left-data-meta-progress-title">In Progress<ul class="p">' + progressList + '</ul></div>')
      $(".left-data-meta-progress").ready(function() {
        $('#menu-icon-p').click(function() {
          $('.left-data-meta-progress-title ul.p').toggleClass('visible');
        });
      });
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

  //Build list from data click
  //$(".left-data-meta").delegate('.left-data-meta-coming-title', 'click', function(e){
    //$(".left-data-meta-coming-title").append('<ul>' + comingList + '</ul>')

    //$(".left-data-meta-coming-list").empty()
    //$(".left-data-meta-coming-list").append(comingList)
  //})
  
  
  
  };
  
  
      
  
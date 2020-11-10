
function insert() { 

  // Build Load structure
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
                $('.left-data').append('<div class="left-data-intro"><p>Elevation Data Finder provides you with ease of access to information on all current and future open elevation datasets in New Zealand.</p></div>');
                $('.left-data').append('<div class="left-data-title"></div>');
                
                $('.left-data').append('<div class="left-data-datasets"></div>');
                $('.left-data').append('<div class="left-data-meta"></div>');
                //$('.left-data').append('<hr><div class="left-data-info">Please select a layer from the legend on the top right of the map.</div>');
                $('.left-data').append('<div class="left-data-lists"></div>');
              $('.left').append('<div class="left-bottom">New to this map? Take a quick tour</div>');

        $('.landboxframe').append('<div id="map"></div>'); 
  
  
  
  //Build Basemap  Settings  
  var settingsBasemap = {
          maxZoom: 16, 
          attribution: '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>', //Simple attribution for linz
  };
            
  //Base map URL
  var aerialBasemap = new L.TileLayer('https://basemaps.linz.govt.nz/v1/tiles/aerial/EPSG:3857/{z}/{x}/{y}.png?api=c01emr2n17q0qtdaens2m3abcwd', settingsBasemap)
  
  var colourBasemap = new L.TileLayer('https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png', settingsBasemap)
  
  // Layer control base map
  var baseMapIndex = {
      "LINZ Aerial Base Map": aerialBasemap,
      "LINZ Colour Base Map": colourBasemap
      };

  var settingsControl = {
    collapsed: false
    };
  
  //build all maps
  var map = new L.Map('map',
           {center: [-39.9, 175.2], 
           zoom: 6,
           layers: colourBasemap
          });
  
  
  //JSON styles
  var availBaseStyle = {
    fillColor: "#cc3366",
    weight: 0.5,
    opacity: 1,
    color: '#dddddd',
    fillOpacity: 0.7
  }

  var comingBaseStyle = {
    fillColor: "#66cccc",
    weight: 0.5,
    opacity: 1,
    color: '#dddddd',
    fillOpacity: 0.7
  }

  var progressBaseStyle = {
    fillColor: "#996699",
    weight: 0.5,
    opacity: 1,
    color: '#dddddd',
    fillOpacity: 0.7
}
  
  var rolloverPoly = {
    fillColor: "yellow",
    color: 'white',
    fillOpacity: 0.7
  }

  
       
  // JSON urls
  var urlAvailable = 'https://xycarto.github.io/vectortile-repo/LiDAR_available_now_fix.json';

  var urlComingSoon = 'https://xycarto.github.io/vectortile-repo/ComingSoon_fix.json';  

  var urlProgress = 'https://xycarto.github.io/vectortile-repo/InProgress_fix.json'; 


 function createOverlayA(data, layerName, availBaseStyle) {
    //console.log(data.features)
    var list = data.features
    $.each(list, function(i, item){
    //console.log(item) 
    item.properties.id ="a"
   })

    var overlayA = L.geoJson(data, availBaseStyle,{
      onEachFeature: function (data) {
        data.features.properties.id == "a"
      }
    }).addTo(map);// Add the data to the map
    
    control.addOverlay(overlayA, layerName, settingsControl);

  }

  function createOverlayC(data, layerName, comingBaseStyle) {
    //console.log(data.features)
    var list = data.features
    $.each(list, function(i, item){
    //console.log(item) 
    item.properties.id="c"
   })
    var overlayC = L.geoJson(data, comingBaseStyle,{
      onEachFeature: function (data) {
        data.features.properties.id == "c"
      }
    }).addTo(map);// Add the data to the map
    control.addOverlay(overlayC, layerName, settingsControl);
  }

  function createOverlayP(data, layerName, progressBaseStyle) {
    var list = data.features
    var list = data.features
    $.each(list, function(i, item){
    //console.log(item) 
    item.properties.id="p"
   })
    var overlayP = L.geoJson(data, progressBaseStyle,{
      onEachFeature: function (data) {
        data.features.properties.id == "p"
      }
    }).addTo(map);// Add the data to the map
    control.addOverlay(overlayP, layerName, settingsControl);
  }

  $.getJSON(urlAvailable, function (data) { 
    createOverlayA(data, "Available", availBaseStyle)
  })

  $.getJSON(urlComingSoon, function (data) { 
    createOverlayC(data, "Coming Soon", comingBaseStyle)
  })

  $.getJSON(urlProgress, function (data) { 
    createOverlayP(data, "In Progress", progressBaseStyle)
  })

  
  map.on('mouseover', function(e){
    //e.layer.setStyle(rolloverPoly)
    var results = leafletPip.pointInLayer(e.latlng, map, false); 
    //console.log(results) 
  })
  /*map.on('mouseout', function(e){
    e.layer.setStyle(availBaseStyle)
  })*/
  
  
  //Begin Click Function
  map.on('click', function (e){
    var results = leafletPip.pointInLayer(e.latlng, map, false);    

    var popupList = [];
    $.each(results, function(i, item){
      if (item.feature.properties.id === "a") {
        var availableName = '<div class="popupText">Available: ' + item.feature.properties.name + '</div>'
        var availableDensity = '<div class="popUpText">Point Density: ' + item.feature.properties.point_dens + '</div>';
        var availableVertical = '<div class="popUpText">Vertical Datum: ' + item.feature.properties.vertical_d + '</div>';
        var availableHorizontal = '<div class="popUpText">Horizontal Datum: ' + item.feature.properties.horizontal + '</div>'; 
        var availableSupplier = '<div class="popUpText">Supplier: ' + item.feature.properties.supplier + '</div>'; 
        var availableFFrom = '<div class="popUpText">Flown From: ' + item.feature.properties.flown_from + '</div>';  
        var availableFTo = '<div class="popUpText">Flown To: ' + item.feature.properties.flown_to + '</div>'; 
        var mainLinks = [
          '<div><a href="' + item.feature.properties.DataDEM + '" target="_blank">Source DEM</a></div>',
          '<div><a href="' + item.feature.properties.DataDSM + '" target="_blank">Source DSM</a></div>',
          '<div><a href="' + item.feature.properties.pointC + '" target="_blank">Source Point Cloud</a></div>'
        ]
        var nameLayerA = [availableName, availableDensity, availableVertical, availableHorizontal, availableSupplier, availableFFrom, availableFTo, mainLinks.join("")]
        popupList.push(nameLayerA);
        }
      else if (item.feature.properties.id === "c") {
        var comingName = '<div class="popupText">Coming Soon: ' + item.feature.properties.Region + '</div>'
        var nameLayerC = [comingName]
        popupList.push(nameLayerC)
        }
      else if (item.feature.properties.id === "p") {
        var progressName = '<div class="popupText">In Progress: ' + item.feature.properties.Region + '</div>'
        var nameLayerP = [progressName]
        popupList.push(nameLayerP)
      }
    });

    //console.log(popupList);
    
    // build list for first popup state
    var popupNames = []
    $.each(popupList, function(i, item){
      var popupListName = item[0];
      popupNames.push(popupListName)
    })

    
    //Make popup state one
    L.popup({maxWidth:1500})        
        .setContent('<div class="select">Please Select a Layer</div><div class="popupwrapper">' + popupNames.join("") + '</div>')
        .setLatLng(e.latlng)
        .openOn(map)
        .on('remove', function() {
          var rolloutPoly = {
            fillColor: color
          }
          results[index].setStyle(rolloutPoly)
          });
       
    //get name of click, compare if a,c,p, then somehow associate name to items in available list

    var index;
    var color;
    $('.popupwrapper').delegate('.popupText', 'mouseenter', function(){     
      index = $(this).index();
      color = results[index].defaultOptions.fillColor
      //console.log(color)
      results[index].setStyle(rolloverPoly)
    })

    $('.popupText').on('mouseleave', function(){     
      index = $(this).index();
      //var resetColor = $(this).results[index].defaultOptions.fillColor
      //console.log(color)
      var rolloutPoly = {
        fillColor: color
      }
      //console.log(index)      
      //console.log(results[index].defaultOptions.fillColor)
      results[index].setStyle(rolloutPoly)
    })    

    $('.popupwrapper').delegate('.popupText', 'click', function(){     
        var index = $(this).index();
        //console.log(index + popupList[index])
        results[index].setStyle(rolloverPoly)
        $('.select').empty()
        $('.popupwrapper').empty()
        $('.left-data-meta').empty()
        $('.popupwrapper').append(popupList[index])
        $('.left-data-meta').append(popupList[index])
      
    })

  }) // end map click function


  //Add Layer Control
  var control = L.control.layers(baseMapIndex,null,settingsControl).addTo(map);
  
  //add control to map
  control.addTo(map);

  
  

 

};
  
  
      
  
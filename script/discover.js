
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
              $('.left').append('<div class="left-title"><div class="titleText">Elevation Data Finder</div></div>'); 
              $('.left').append('<div class="left-data"></div>');
                $('.left-data').append('<div class="left-data-intro"><p>We provide ease of access to information on all current and future open LiDAR datasets managed by LINZ and regional councils. </p></div>');
                $('.left-data').append('<div class="left-data-intro-too"><p>You are currently viewing all the map layers. Explore the map to find information about the area you need. If a dataset for the area exists, get the link to crop, select and download the data.</p></div>');
                $('.left-data').append('<div class="left-data-title"></div>');
                
                $('.left-data').append('<div class="left-data-datasets"></div>');
                $('.left-data').append('<div class="left-data-meta"></div>');
                //$('.left-data').append('<hr><div class="left-data-info">Please select a layer from the legend on the top right of the map.</div>');
                $('.left-data').append('<div class="left-data-lists"></div>');
              $('.left').append('<div class="left-bottom"><p><i class="fa fa-cog" title="tool-tip"></i><strong>Tool tip:</strong> Only want to see what’s coming soon or is in progress? Uncheck the relevant boxes in the map legend.</p></div>');
        $('.landboxframe').append('<div id="map"></div>'); 
      $('.alldiv').append('<div class="bottom"><div class="bottomText">This website is an initiative of Land Information New Zealand in partnership with regional councils.</div></div>');
  
  
  
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
           layers: aerialBasemap
          });
  
  
  //JSON styles
  var availBaseStyle = {
    fillColor: "#cc3366",
    weight: 0.5,
    opacity: 1,
    color: '#dddddd',
    fillOpacity: 0.4
  }

  var comingBaseStyle = {
    fillColor: "#66cccc",
    weight: 0.5,
    opacity: 1,
    color: '#dddddd',
    fillOpacity: 0.4
  }

  var progressBaseStyle = {
    fillColor: "#996699",
    weight: 0.5,
    opacity: 1,
    color: '#dddddd',
    fillOpacity: 0.4
}
  
  var rolloverPoly = {
    fillColor: "yellow",
    color: 'white',
    fillOpacity: 0.4
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

    overlayA.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayA.on('mouseout', function(e){
      e.layer.setStyle(availBaseStyle)
    })

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
    overlayC.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayC.on('mouseout', function(e){
      e.layer.setStyle(availBaseStyle)
    })
  }

  function createOverlayP(data, layerName, progressBaseStyle) {
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
    overlayP.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayP.on('mouseout', function(e){
      e.layer.setStyle(availBaseStyle)
    })
  }

  var availName = '<span><span class="legend-at"></span>Available Now</span>'
  $.getJSON(urlAvailable, function (data) { 
    createOverlayA(data, availName, availBaseStyle)
  })

  var comingName = '<span><span class="legend-cs"></span>Coming Soon</span>'
  $.getJSON(urlComingSoon, function (data) { 
    createOverlayC(data, comingName, comingBaseStyle)
  })

  var progressName = '<span><span class="legend-ip"></span>In Progress</span>'
  $.getJSON(urlProgress, function (data) { 
    createOverlayP(data, progressName, progressBaseStyle)
  })

  
  
  
  
  //Begin Click Function
  map.on('click', function (e){
    var results = leafletPip.pointInLayer(e.latlng, map, false);    
    //console.log(results)
    var popupStateOne = [];
    var popupList = [];
    $.each(results, function(i, item){
      if (item.feature.properties.id === "a") {
        var availableName = '<div class="popupText"> Available: '+ item.feature.properties.name + '</div>'
        var availableNameTitle = '<div class="popupTextTitle">'+ item.feature.properties.name + '</div>'
        var available = '<div class="popupTextType">Available Now</div>'
        var metaTitle = '<div class="popupText" style="margin-bottom: 10; font-weight:550;">Metadata</div>'
        var availableDensity = '<div class="popupText" style="margin-left: 15;">Point Density: ' + item.feature.properties.point_dens + '</div>';
        var availableVertical = '<div class="popupText" style="margin-left: 15;">Vertical Datum: ' + item.feature.properties.vertical_d + '</div>';
        var availableHorizontal = '<div class="popupText" style="margin-left: 15;">Horizontal Datum: ' + item.feature.properties.horizontal + '</div>'; 
        var availableSupplier = '<div class="popupText" style="margin-left: 15;">Supplier: ' + item.feature.properties.supplier + '</div>'; 
        var availableFFrom = '<div class="popupText" style="margin-left: 15;">Flown From: ' + item.feature.properties.flown_from + '</div>';  
        var availableFTo = '<div class="popupText" style="margin-left: 15;">Flown To: ' + item.feature.properties.flown_to + '</div>'; 
        var mainLinks = [
          '<div class="popupText" style="margin-bottom: 10; font-weight:550;">Available Downloads</div>',
          '<div class="popupText" style="margin-left: 15;"><a href="' + item.feature.properties.DataDEM + '" target="_blank">Source DEM (LINZ)</a></div>',
          '<div class="popupText" style="margin-left: 15;"><a href="' + item.feature.properties.DataDSM + '" target="_blank">Source DSM (LINZ)</a></div>',
          '<div class="popupText" style="margin-left: 15;"><a href="' + item.feature.properties.pointC + '" target="_blank">Source Point Cloud (OpenTopo)</a></div>',
          '<hr>'
        ]
        var nameLayerA = [availableNameTitle, available, mainLinks.join(""), metaTitle, availableDensity, availableVertical, availableHorizontal, availableSupplier, availableFFrom, availableFTo]
        popupList.push(nameLayerA);
        popupStateOne.push(availableName);
        }
      else if (item.feature.properties.id === "c") {
        var comingName = '<div class="popupText">Coming Soon: ' + item.feature.properties.Region + '</div>'
        var comingNameTitle = '<div class="popupTextTitle">'+ item.feature.properties.Region+ '</div>'
        var coming = '<div class="popupTextType" style="margin-bottom: 10;">Coming Soon</div>'
        var start = '<div class="popupText">Start Date: Info Not Yet Available</div>';
        var delivery = '<div class="popupText">Expected Delivery Date: ' + item.feature.properties.DataDelive + '</div>';
        var pulse = '<div class="popupText">Pulse Density: ' + item.feature.properties.PulseDensi + '</div>';
        var dem = '<div class="popupText">DEM: ' + item.feature.properties.DEM + '</div>';
        var dsm = '<div class="popupText">DSM: ' + item.feature.properties.DSM + '</div>';
        var pointCloud = '<div class="popupText">Point Cloud: ' + item.feature.properties.PointCloud + '</div>';
        var contour = '<div class="popupText">Contour: ' + item.feature.properties.Contours + '</div>';
        var projectLead = '<div class="popupText">Team Lead: Info Not Yet Available</div>';  
        var nameLayerC = [comingNameTitle, coming, start, delivery, pulse, dem, dsm, pointCloud, contour, projectLead]
        popupList.push(nameLayerC)
        popupStateOne.push(comingName);
        }
      else if (item.feature.properties.id === "p") {
        var progressName = '<div class="popupText">In Progress: ' + item.feature.properties.Region + '</div>'
        var progressNameTitle = '<div class="popupTextTitle">'+ item.feature.properties.Region + '</div>'
        var progress = '<div class="popupTextType" style="margin-bottom: 10;">In Progress</div>'
        var start = '<div class="popUpText">Start Date: ' + item.feature.properties.ProjectSta + '</div>';
        var delivery = '<div class="popUpText">Expected Delivery Date: ' + item.feature.properties.ProjectCom + '</div>';
        var pulse = '<div class="popUpText">Pulse Density: ' + item.feature.properties.PulseDensi + '</div>';
        var dem = '<div class="popUpText">DEM: ' + item.feature.properties.DEM + '</div>';
        var dsm = '<div class="popUpText">DSM: ' + item.feature.properties.DSM + '</div>';
        var pointCloud = '<div class="popUpText">Point Cloud: ' + item.feature.properties.PointCloud + '</div>';
        var contour = '<div class="popUpText">Contour: ' + item.feature.properties.Contours + '</div>';
        var projectLead = '<div class="popUpText">Team Lead: Info Not Yet Available</div>';  
        var nameLayerP = [progressNameTitle, progress, start, delivery, pulse, dem, dsm, pointCloud, contour, projectLead]
        popupList.push(nameLayerP)
        popupStateOne.push(progressName);
      }
    });

    //console.log(popupList);
    
    // build list for first popup state
    var popupNames = []
    $.each(popupList, function(i, item){
      var popupListName = item[0];
      popupNames.push(popupListName)
    })

    //console.log(popupNames)
    //console.log(popupList)

    
    //Make popup state one
    if (popupStateOne.join("") != "") {
    //console.log(popupStateOne.join(""))
    var popup = L.popup({maxWidth:3000})        
        .setContent('<div><div class="select">Please Select a Layer</div><div class="popupwrapper">' + popupStateOne.join("") + '</div></div>')
        .setLatLng(e.latlng)
        .openOn(map)
        .on('remove', function() {
          var rolloutPoly = {
            fillColor: color
          }
          results[index].setStyle(rolloutPoly)
          $('.left-data-meta').empty()
          });
    }
       
    //get name of click, compare if a,c,p, then somehow associate name to items in available list

    var index;
    var color;
    $('.popupText').on('mouseenter', function(){     
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

    
    
    popup.bindPopup('.popupwrapper')
    //console.log(popupList)

    $('.popupwrapper').delegate('.popupText', 'click', function(){     
        var index = $(this).index();
        //console.log(index + popupList[index])
        $('.select').empty()
        $('.popupwrapper').empty()
        $('.left-data-meta').empty()
        $('.left-data-intro-too').empty()
        //popup.setContent(popupList)
        var myList = popupList[index].join("")
        newList = myList.replace(/,/g, '')
        popup.setContent(newList)

        $.each(popupList[index], function(i,item){
          //popup.setContent('foo'+ i)
          //inList = item;
          $('.left-data-meta').append('<div>' + item + '</div>')
          //console.log(item)
        })
        //console.log(inList)
        //results[index].setStyle(rolloverPoly)

    })

  }) // end map click function

  

  //Add Layer Control
  var control = L.control.layers(baseMapIndex,null,settingsControl).addTo(map);
  
  //add control to map
  control.addTo(map);

  
  

 

};
  
  
      
  
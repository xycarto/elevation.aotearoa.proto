
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
                $('.left-data').append('<div class="left-data-title">Title</div>');
                
                $('.left-data').append('<div class="left-data-datasets"><p>Elevation Data Finder provides you with ease of access to information on all current and future open elevation datasets in New Zealand.</p></div>');
                $('.left-data').append('<div class="left-data-meta"></div>');
                $('.left-data').append('<div class="left-data-lists"></div>');
              $('.left').append('<div class="left-bottom">New to this map? Take a quick tour</div>');
        $('.landboxframe').append('<div id="map"></div>'); 
  
  
  
  //Build Basemap  Settings  
  var settingsBasemap = {
          maxZoom: 16, 
          attribution: '<a href="http://www.linz.govt.nz">Sourced from LINZ. CC-BY 4.0</a>', //Simple attribution for linz
  };
            
  //Base map URL
  var basemap = new L.TileLayer('https://tiles.maps.linz.io/nz_colour_basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png', settingsBasemap)
  
  // Layer control base map
  var baseMapIndex = {
      "LINZ Colour Base Map": basemap
      };

  var settingsControl = {
    collapsed: false
    };
  
  //build all maps
  var map = new L.Map('map',
           {center: [-39.9, 175.2], 
           zoom: 6,
           layers: basemap
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

  


  //////////////////////////////// Available Begin
  //Load Available Now layer
  function createOverlayA(data, layerName, availBaseStyle) {
    var overlayA = L.geoJson(data, availBaseStyle,{
      onEachFeature: function (feature, layer) {
        return _layers._leaflet_id; 
      }
    });// Add the data to the map
    control.addOverlay(overlayA, layerName, settingsControl); // Add the layer to the Layer Control.
    
    //mouse over functions fro avialable layer
    overlayA.on('click', function(e){ 
      // vars for on map click Available now
      var demList = [
        '<li><a href="' + e.layer.feature.properties.DataDEM + '" target="_blank">Source DEM</a></li>',
        '<li>WMTS</li>',
        '<li>XYZ</li>'
      ];
      var dsmList = [
        '<li><a href="' + e.layer.feature.properties.DataDEM + '" target="_blank">Source DEM</a></li>',
        '<li>WMTS</li>',
        '<li>XYZ</li>'
      ];
      var pointList = [
        '<li><a href="' + e.layer.feature.properties.PointC + '" target="_blank">Point Cloud</a></li>'
      ];
      var popupDensity = '<div class="popUpText">Point Density:' + e.layer.feature.properties.point_dens + '</div>';
      var popupVertical = '<div class="popUpText">Vertical Datum: ' + e.layer.feature.properties.vertical_d + '</div>';
      var popupHorizontal = '<div class="popUpText">Horizontal Datum: ' + e.layer.feature.properties.horizontal + '</div>';
      var popupSupplier = '<div class="popUpText">Supplier: ' + e.layer.feature.properties.supplier + '</div>';
      var popupFlownFrom = '<div class="popUpText">Flown From: ' + e.layer.feature.properties.flown_from + '</div>';
      var popupFlownTo = '<div class="popUpText">Flown To: ' + e.layer.feature.properties.flown_to + '</div>';

      // Build sidebar when map clicked Available now
      $(".left-data-datasets").empty();
      $(".left-data-title").empty();
      $(".left-data-meta").empty();
      $(".left-data-title").append(e.layer.feature.properties.name);
      $(".left-data-datasets").append('<div class="left-data-datasets-DEM"></div>')
          $(".left-data-datasets-DEM").append('<a href="#" id="menu-icon-e"></a><div class="left-data-datasets-DEM-title">Digital Elevation Model<ul class="e">' + demList + '</ul></div>')
          $('.left-data-datasets-DEM').on('click', '#menu-icon-e', function(){
            $('.left-data-datasets-DEM-title ul.e').toggleClass('visible');
          });
      $(".left-data-datasets").append('<div class="left-data-datasets-DSM"></div>')
          $(".left-data-datasets-DSM").append('<a href="#" id="menu-icon-s"></a><div class="left-data-datasets-DSM-title">Digital Surface Model<ul class="s">' + dsmList + '</ul></div>')
        $('.left-data-datasets-DSM').on('click', '#menu-icon-s', function(){
            $('.left-data-datasets-DSM-title ul.s').toggleClass('visible');
        });
        $(".left-data-datasets").append('<div class="left-data-datasets-PointC"></div>')
        $(".left-data-datasets-PointC").append('<a href="#" id="menu-icon-c"></a><div class="left-data-datasets-PointC-title">Point Cloud<ul class="c">' + pointList + '</ul></div>')
        $('.left-data-datasets-PointC').on('click', '#menu-icon-c', function(){
            $('.left-data-datasets-PointC-title ul.c').toggleClass('visible');
        });
        
      $(".left-data-meta").append('<div>Metadata</div>');
      $(".left-data-meta").append(popupDensity, popupVertical, popupHorizontal, popupSupplier, popupFlownFrom, popupFlownTo);
    })
    overlayA.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayA.on('mouseout', function(e){
      e.layer.setStyle(availBaseStyle)
    })

  //highlight available layer from side bar list
  var ids = overlayA._layers
  $(".left-data-lists").delegate(".name", 'mouseenter mouseleave', function(e) {
    var txtA = $(this).text();
    //console.log(txt)
    $.each(ids, function(i, item){
      //console.log(item._leaflet_id + item.feature.properties.name)
      if (item.feature.properties.name == txtA && e.type == 'mouseenter'){
        item.setStyle(rolloverPoly);
        //console.log(item)
      }
      else {
        item.setStyle(availBaseStyle);
        //console.log(item)
      }
    })
  })

    
  //Build info if item clicked in side bar list 
  $(".left-data-lists").delegate(".name", 'click', function() {
    var txtAS = $(this).text();

    $.each(availableFeaturesList, function(i, result){      
      if (txtAS == result.properties.name){
        //text templates for available side bar populate
        var demList = [
          '<li><a href="' + result.properties.DataDEM + '" target="_blank">Source DEM</a></li>',
          '<li>WMTS</li>',
          '<li>XYZ</li>'
        ];
        var dsmList = [
          '<li><a href="' + result.properties.DataDEM + '" target="_blank">Source DEM</a></li>',
          '<li>WMTS</li>',
          '<li>XYZ</li>'
        ];  
        var popupDensity = '<div class="popUpText">Point Density:' + result.properties.point_dens + '</div>';
        var popupVertical = '<div class="popUpText">Vertical Datum: ' + result.properties.vertical_d + '</div>';
        var popupHorizontal = '<div class="popUpText">Horizontal Datum: ' + result.properties.horizontal + '</div>';
        var popupSupplier = '<div class="popUpText">Supplier: ' + result.properties.supplier + '</div>';
        var popupFlownFrom = '<div class="popUpText">Flown From: ' + result.properties.flown_from + '</div>';
        var popupFlownTo = '<div class="popUpText">Flown To: ' + result.properties.flown_to + '</div>';
  
        //build html structure with names on click from available
        $(".left-data-datasets").empty();
        $(".left-data-title").empty();
        $(".left-data-meta").empty();

        $(".left-data-title").append(result.properties.name);
        $(".left-data-datasets").append('<div class="left-data-datasets-DEM"></div>')
          $(".left-data-datasets-DEM").append('<a href="#" id="menu-icon-e"></a><div class="left-data-datasets-DEM-title">Digital Elevation Model<ul class="e">' + demList + '</ul></div>')
          $('.left-data-datasets-DEM').on('click', '#menu-icon-e', function(){
            $('.left-data-datasets-DEM-title ul.e').toggleClass('visible');
          });
        $(".left-data-datasets").append('<div class="left-data-datasets-DSM"></div>')
          $(".left-data-datasets-DSM").append('<a href="#" id="menu-icon-s"></a><div class="left-data-datasets-DSM-title">Digital Surface Model<ul class="s">' + dsmList + '</ul></div>')
          $('.left-data-datasets-DSM').on('click', '#menu-icon-s', function(){
            $('.left-data-datasets-DSM-title ul.s').toggleClass('visible');
          });
          $(".left-data-datasets").append('<div class="left-data-datasets-PointC"></div>')
          $(".left-data-datasets-PointC").append('<a href="#" id="menu-icon-c"></a><div class="left-data-datasets-PointC-title">Point Cloud<ul class="c">' + dsmList + '</ul></div>')
          $('.left-data-datasets-PointC').on('click', '#menu-icon-c', function(){
            $('.left-data-datasets-PointC-title ul.c').toggleClass('visible');
          });
          
        $(".left-data-meta").append('<div>Metadata</div>');
        $(".left-data-meta").append(popupDensity, popupVertical, popupHorizontal, popupSupplier, popupFlownFrom, popupFlownTo);
        }
      })
    });
  }

  // build lists from list for Available for legend click functions Available
  var availableList = [];
  var availableFullList = [];
  var availableFeaturesList = [];
  function getListA(data){
    $.each(data.features, function(i, result){
      availableList.push('<div class="name">'+ result.properties.name + '</div>')
      availableFullList.push(result.properties)
      availableFeaturesList.push(result)
    })
  }

  //Load Available Now JSON into map
  $.getJSON(urlAvailable, function (data) { 
    createOverlayA(data, "Available Now", availBaseStyle)
  }).done(function (data) {
    getListA(data);
  });

  //////////////////////////////////// End Available Now functions


  ////////////////////////////////////  Begin Coming Soon Functions

  //Load Coming Soon layer/*
  function createOverlayC(data, layerName, comingBaseStyle) {
    var overlayC = L.geoJson(data, comingBaseStyle,{
      onEachFeature: function (feature, layer) {
        return _layers._leaflet_id; 
      }
    });// Add the data to the map
    control.addOverlay(overlayC, layerName, settingsControl);
     console.log(overlayC)
    //Mouse over functions for map layer Coming Soon
    overlayC.on('click', function(e){
      //vars for mouse over
      var start = '<div class="popUpText">Start Date: Info Not Yet Available</div>';
      var delivery = '<div class="popUpText">Expected Delivery Date: ' + e.layer.feature.properties.DataDelive + '</div>';
      var pulse = '<div class="popUpText">Pulse Density: ' + e.layer.feature.properties.PulseDensi + '</div>';
      var dem = '<div class="popUpText">DEM: ' + e.layer.feature.properties.DEM + '</div>';
      var dsm = '<div class="popUpText">DSM: ' + e.layer.feature.properties.DSM + '</div>';
      var pointCloud = '<div class="popUpText">Point Cloud: ' + e.layer.feature.properties.PointCloud + '</div>';
      var contour = '<div class="popUpText">Contour: ' + e.layer.feature.properties.Contours + '</div>';
      var projectLead = '<div class="popUpText">Team Lead: Info Not Yet Available</div>';      
      //Build side bar list
      $(".left-data-datasets").empty();
      $(".left-data-title").empty();
      $(".left-data-meta").empty();
      $(".left-data-title").append(e.layer.feature.properties.Region);
      $(".left-data-meta").append('<div>Info</div>');
      $(".left-data-meta").append(start);
      $(".left-data-meta").append(delivery);
      $(".left-data-meta").append(pulse);
      $(".left-data-meta").append('<div>Deliverables:</div>');
      $(".left-data-meta").append(dem);
      $(".left-data-meta").append(dsm);
      $(".left-data-meta").append(pointCloud);
      $(".left-data-meta").append(contour);
      $(".left-data-meta").append(projectLead);
    })
    //mouse over functions coming
    overlayC.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayC.on('mouseout', function(e){
      e.layer.setStyle(comingBaseStyle)
    })

    // Mouse roll over highligh from side bar list
    var idsC = overlayC._layers
    $(".left-data-lists").delegate(".name", 'mouseenter mouseleave', function(e) {
    var txtCS = $(this).text();
    //console.log(txt)
    $.each(idsC, function(i, item){
      //console.log(item._leaflet_id + item.feature.properties.name)
      if (item.feature.properties.Region == txtCS && e.type == 'mouseenter'){
        item.setStyle(rolloverPoly);
        //console.log(item)
      }
      else {
        item.setStyle(comingBaseStyle);
        //console.log(item)
        }
      })
    })
  }

     //Build info if item clicked in side bar list Coming Soon layer
  $(".left-data-lists").delegate(".name", 'click', function() {
    var txtC = $(this).text();
    console.log(txtC)
    $.each(comingFeaturesList, function(i, result){      
      if (txtC == result.properties.Region){
        var start = '<div class="popUpText">Start Date: Info Not Yet Available</div>';
        var delivery = '<div class="popUpText">Expected Delivery Date: ' + result.properties.DataDelive + '</div>';
        var pulse = '<div class="popUpText">Pulse Density: ' + result.properties.PulseDensi + '</div>';
        var dem = '<div class="popUpText">DEM: ' + result.properties.DEM + '</div>';
        var dsm = '<div class="popUpText">DSM: ' + result.properties.DSM + '</div>';
        var pointCloud = '<div class="popUpText">Point Cloud: ' + result.properties.PointCloud + '</div>';
        var contour = '<div class="popUpText">Contour: ' + result.properties.Contours + '</div>';
        var projectLead = '<div class="popUpText">Team Lead: Info Not Yet Available</div>';      
        //Build side bar list
        $(".left-data-datasets").empty();
        $(".left-data-title").empty();
        $(".left-data-meta").empty();
        $(".left-data-title").append(result.properties.Region);
        $(".left-data-meta").append('<div>Info</div>');
        $(".left-data-meta").append(start);
        $(".left-data-meta").append(delivery);
        $(".left-data-meta").append(pulse);
        $(".left-data-meta").append('<div>Deliverables:</div>');
        $(".left-data-meta").append(dem);
        $(".left-data-meta").append(dsm);
        $(".left-data-meta").append(pointCloud);
        $(".left-data-meta").append(contour);
        $(".left-data-meta").append(projectLead);
      }
    }) 
  })

  // build lists from list for COMING SOON for legend click functions 
  var comingList = [];
  var comingFullList = [];
  var comingFeaturesList = [];
  function getListC(data){
    $.each(data.features, function(i, result){
      comingList.push('<div class="name">'+ result.properties.Region + '</div>')
      comingFullList.push(result.properties)
      comingFeaturesList.push(result)
    })
  }

  //get coming soon layer for map
  $.getJSON(urlComingSoon, function (data) { 
    createOverlayC(data, "Coming Soon", comingBaseStyle)
  }).done(function (data) {
    getListC(data);
  });

  ////////////////////////////////////////////// End Coming Soon Functions


  ////////////////////////////////////////////// Begin In Progress Functions
  //Load In Progress layer
  function createOverlayP(data, layerName, progressBaseStyle) {
    var overlayP = L.geoJson(data, progressBaseStyle,{
      onEachFeature: function (feature, layer) {
        return layer._leaflet_id = feature.elevation_; 
      }
    });// Add the data to the map
    control.addOverlay(overlayP, layerName, settingsControl);
    
    //Progress layer mounse over functions
    overlayP.on('click', function(e){
      //vars for mouse over
      var start = '<div class="popUpText">Start Date:' + e.layer.feature.properties.ProjectSta + '</div>';
      var delivery = '<div class="popUpText">Expected Delivery Date: ' + e.layer.feature.properties.ProjectCom + '</div>';
      var pulse = '<div class="popUpText">Pulse Density: ' + e.layer.feature.properties.PulseDensi + '</div>';
      var dem = '<div class="popUpText">DEM: ' + e.layer.feature.properties.DEM + '</div>';
      var dsm = '<div class="popUpText">DSM: ' + e.layer.feature.properties.DSM + '</div>';
      var pointCloud = '<div class="popUpText">Point Cloud: ' + e.layer.feature.properties.PointCloud + '</div>';
      var contour = '<div class="popUpText">Contour: ' + e.layer.feature.properties.Contours + '</div>';
      var projectLead = '<div class="popUpText">Team Lead: Info Not Yet Available</div>';      
      //Build side bar list
      $(".left-data-datasets").empty();
      $(".left-data-title").empty();
      $(".left-data-meta").empty();
      $(".left-data-title").append(e.layer.feature.properties.Region);
      $(".left-data-meta").append('<div>Info</div>');
      $(".left-data-meta").append(start);
      $(".left-data-meta").append(delivery);
      $(".left-data-meta").append(pulse);
      $(".left-data-meta").append('<div>Deliverables:</div>');
      $(".left-data-meta").append(dem);
      $(".left-data-meta").append(dsm);
      $(".left-data-meta").append(pointCloud);
      $(".left-data-meta").append(contour);
      $(".left-data-meta").append(projectLead);
    })
    overlayP.on('mouseover', function(e){
      e.layer.setStyle(rolloverPoly)
    })
    overlayP.on('mouseout', function(e){
      e.layer.setStyle(progressBaseStyle)
    })

    // Mouse roll over highligh from side bar list
    var idsP = overlayP._layers
    $(".left-data-lists").delegate(".name", 'mouseenter mouseleave', function(e) {
    var txtPS = $(this).text();
    //console.log(txt)
    $.each(idsP, function(i, item){
      //console.log(item._leaflet_id + item.feature.properties.name)
      if (item.feature.properties.Region == txtPS && e.type == 'mouseenter'){
        item.setStyle(rolloverPoly);
        //console.log(item)
      }
      else {
        item.setStyle(progressBaseStyle);
        //console.log(item)
        }
      })
    })
  }

      //Build info if item clicked in side bar list progress layer
      $(".left-data-lists").delegate(".name", 'click', function() {
        var txtP = $(this).text();
        console.log(txtP)
        
        $.each(progressFeaturesList, function(i, result){  
          console.log(result.properties.Region)
          if (txtP == result.properties.Region){
            var start = '<div class="popUpText">Start Date:' + result.properties.ProjectSta + '</div>';
            var delivery = '<div class="popUpText">Expected Delivery Date: ' + result.properties.ProjectCom + '</div>';
            var pulse = '<div class="popUpText">Pulse Density: ' + result.properties.PulseDensi + '</div>';
            var dem = '<div class="popUpText">DEM: ' + result.properties.DEM + '</div>';
            var dsm = '<div class="popUpText">DSM: ' + result.properties.DSM + '</div>';
            var pointCloud = '<div class="popUpText">Point Cloud: ' + result.properties.PointCloud + '</div>';
            var contour = '<div class="popUpText">Contour: ' + result.properties.Contours + '</div>';
            var projectLead = '<div class="popUpText">Team Lead: Info Not Yet Available</div>';      
            //Build side bar list
            $(".left-data-datasets").empty();
            $(".left-data-title").empty();
            $(".left-data-meta").empty();
            $(".left-data-title").append(result.properties.Region);
            $(".left-data-meta").append('<div>Info</div>');
            $(".left-data-meta").append(start);
            $(".left-data-meta").append(delivery);
            $(".left-data-meta").append(pulse);
            $(".left-data-meta").append('<div>Deliverables:</div>');
            $(".left-data-meta").append(dem);
            $(".left-data-meta").append(dsm);
            $(".left-data-meta").append(pointCloud);
            $(".left-data-meta").append(contour);
            $(".left-data-meta").append(projectLead);
          }
        }) 
      })
    
      // build lists from list for COMING SOON for legend click functions 
      var progressList = [];
      var progressFullList = [];
      var progressFeaturesList = [];
      function getListP(data){
        $.each(data.features, function(i, result){
          progressList.push('<div class="name">'+ result.properties.Region + '</div>')
          progressFullList.push(result.properties)
          progressFeaturesList.push(result)
        })
      }
  
  $.getJSON(urlProgress, function (data) { 
    createOverlayP(data, "In Progress", progressBaseStyle)
  })
  .done(function (data) {
    getListP(data);
  });

  
  //////////////////////////////// End In Progress Functions
  

  ///////////////////////////////////// Map legend Click functions

  //Add Layer Control
  var control = L.control.layers(baseMapIndex,null,settingsControl).addTo(map);
  
  //add control to map
  control.addTo(map);

  //Map Legend Click Functions  
  map.on('overlayadd', function (e) {
    if (e.name === 'Available Now') {
      $(".left-data-datasets").empty();
      $(".left-data-title").empty(); 
      $(".left-data-meta").empty(); 
                
      $(".left-data-lists").append('<div class="left-data-meta-avail"></div>')
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
      $(".left-data-meta").empty(); 

      $(".left-data-lists").append('<div class="left-data-meta-coming"></div>')
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
      $(".left-data-meta").empty(); 
      
      $(".left-data-lists").append('<div class="left-data-meta-progress"></div>')
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

};
  
  
      
  
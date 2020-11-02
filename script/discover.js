
function insert() { 
$('body').append('<div class="alldiv"></div>');
       
  $('.alldiv').append('<div class="top"></div>');
      $('.top').append('<div class="menuitem-index"><a href="index.html"><span>Elevation Aotearoa</span></a></div>');
      $('.top').append('<div class="menuitem"><a href="discover.html"><span>Discover Data</span></a></div>');
      $('.top').append('<div class="menuitem"><span><a href="learn.html">Learn</a></span></div>');
      $('.top').append('<div class="menuitem"><span><a href="connect.html">Connect</a></span></div>');
      $('.top').append('<div class="menuitem"><span><a href="about.html">About</a></span></div>');
  $('.alldiv').append('<div class="landboxframe"></div>');
      $('.landboxframe').append('<div class="left"></div>'); 
            $('.left').append('<div class="left-title">Please Choose a Layer from the Layer Selector (Top Right of Map)</div>'); 
            $('.left').append('<div class="left-data">left data</div>');
      $('.landboxframe').append('<div id="map"></div>'); 


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
var popupDensity = '<div class="popUpText"><strong>Point Density: </strong>' + e.layer.properties.point_dens + '</div>';
var popupVertical = '<div class="><strong>Vertical Datum: </strong>' + e.layer.properties.vertical_d + '</div>';
var popupHorizontal = '<div class="><strong>Horizontal Datum: </strong>' + e.layer.properties.horizontal + '</div>';
var popupSupplier = '<div class="><strong>Supplier: </strong>' + e.layer.properties.supplier + '</div>';
var popupFlownFrom = '<div class="popUpText"><strong>Flown From: </strong>' + e.layer.properties.flown_from + '</div>';
var popupFlownTo = '<div class="popUpText"><strong>Flown To: </strong>' + e.layer.properties.flown_to + '</div>';
var popupGetData = '<div class="popUpText"><strong>Get Data: </strong>' + '<ul><li><a href="' + e.layer.properties.DataDEM + '" target="_blank">Digital Elevation Model(DEM)</a></li><li><a href="'+ e.layer.properties.DataDSM + '" target="_blank">Digital Surface Model(DSM)</a></li><li><a href="' + e.layer.properties.DataPointC+ '" target="_blank">Point Cloud(LAS)</a></li></ul></div>';
//$("#sp-head").text(e.layer.properties.name);
//$("#fill-items").text(e.layer.properties.point_dens, e.layer.properties.vertical_d);
L.popup()
  .setContent(popupName + popupDensity + popupVertical + popupHorizontal + popupSupplier + popupFlownFrom + popupFlownTo+ popupGetData)
  .setLatLng(e.latlng)
  .openOn(map);
})
.on("mouseover", function(e) {
  e.layer.setStyle({
    fillColor: "yellow"
  })
  //var nameID = e.layer.properties.name;
  //console.log(nameID);
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
          $.getJSON("https://xycarto.github.io/vectortile-repo/available_now/metadata.json", { get_param: 'value' }, function(data) {
            var parsed = JSON.parse(data.json)
            var listNames = parsed.tilestats.layers[0].attributes[15].values;
            window.listNames = listNames
            $.each(listNames, function(i, item){
              var name = '<div class="left-list">' + item + '</div>';
              $(".left-data").append(name);
              $(".left-data").data = name;
            })
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

    $(".left").delegate(".left-data", "click", function(){
      $(".left-data").empty()
      $(".left-data").append('<div class="data">data clicked</div>')
      $(".left-data").append('<div class="return">return to list</div>')
      $(".left-data").find(".return").click(function(){
        $(".left-data").remove()
        $('.left').append('<div class="left-data"></div>');
        console.log("return clicked")
        //console.log(listNames)
        //$(".left-data").text(listNames)
        $.each(listNames, function(i, item){
          var name = '<div class="left-list">' + item + '</div>';
          $(".left-data").append(name);
        })
      })
    })
    
    
    map.addLayer(map);

};


    


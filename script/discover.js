
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


 function createOverlayA(data, layerName, availBaseStyle) {
    L.geoJson(data, availBaseStyle,{
      onEachFeature: function (feature, layer) {
        return _layers._leaflet_id; 
      }
    }).addTo(map);// Add the data to the map
  }

  function createOverlayC(data, layerName, availBaseStyle) {
    L.geoJson(data, comingBaseStyle,{
      onEachFeature: function (feature, layer) {
        return _layers._leaflet_id; 
      }
    }).addTo(map);// Add the data to the map
  }

  $.getJSON(urlAvailable, function (data) { 
    createOverlayA(data, "avail", availBaseStyle)
  })

  $.getJSON(urlComingSoon, function (data) { 
    createOverlayC(data, "avail", availBaseStyle)
  })

  map.on('click', function (e){
    var results = leafletPip.pointInLayer(e.latlng, map, false);
      console.log(results)
    })



  //Add Layer Control
  var control = L.control.layers(baseMapIndex,null,settingsControl).addTo(map);
  
  //add control to map
  control.addTo(map);



  

 

};
  
  
      
  
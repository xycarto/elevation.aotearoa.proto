
function insert() { 
    $('body').append('<div class="top"><a href="index.html">Elevation Aotearoa</a></div>');
    $('body').append('<div class="menu"></div>'); 
    $('body').append('<div class="left">Left</div>'); 
    $('body').append('<div id="map"></div>'); 
    $('.menu').append('<div class="menuitem"><a href="discover.html">Discover Data</a></div>');
    $('.menu').append('<div class="menuitem"><a href="stories.html">Our Stories</a></div>');
    $('.menu').append('<div class="menuitem"><a href="learn.html">Learn</a></div>');
    $('.menu').append('<div class="menuitem"><a href="connect.html">Connect</a></div>');
    $('.menu').append('<div class="menuitem"><a href="about.html">About</a></div>');


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
        //"Available Now": vectorAvailable,
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

    map.addLayer(map);

};


    


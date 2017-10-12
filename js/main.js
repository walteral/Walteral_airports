var mymap = L.map('map', {center: [39.8283, -98.5795], zoom: 4});

var Esri_WorldPhysical = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
    maxZoom: 16
}).addTo(mymap);
//create the airports variable
var airports = null;
var towers = null;
var states = null;

airports = L.geoJson.ajax("assets/airports.geojson",{
    onEachFeature: function(feature,layer){
        layer.bindPopup(feature.properties.AIRPT_NAME)
    },

    pointToLayer: function(feature,latlng) {
        if (feature.properties.CNTL_TWR == "Y")
            return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane'})});
        else
            return L.marker(latlng, {icon: L.divIcon({
                className: 'fa fa-paper-plane marker-color'})})
    }
}).addTo(mymap);





colors = chroma.scale('GnBu').mode('lch').colors(5);

function setColor(count) {
    var id = 0;
    if (count >= 59) {
        id = 4;
    }
    else if (count > 26 && count <= 58) {
        id = 3;
    }
    else if (count > 15 && count <= 26) {
        id = 2;
    }
    else if (count > 8 && count <= 15) {
        id = 1;
    }
    else {
        id = 0;
    }
    return colors[id];
}

function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.7,
        weight: 2,
        opacity: 1,
        color: 'blue',
        dashArray: '4'

    };
}

L.geoJson.ajax("assets/us-states.geojson",{
    style: style
}).addTo(mymap)

var legend = L.control({position: 'topright'});
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># of Airports </b><br />';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>59+</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>27-58</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>16-26</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 8-15</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0- 7</p>';
    div.innerHTML += '<hr><b>Airports<b><br />';
    div.innerHTML += '<i class="fa fa-plane"></i><p> Airport w/ Towers</p>';
    div.innerHTML += '<i class="fa fa-paper-plane" style = "color:green"></i><p> Airport w/o Towers</p>';
    return div;
};

legend.addTo(mymap);
L.control.scale({position: 'bottomleft'}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked on "+ e.latlng)
        .openOn(mymap);
};



function highlightFeature(e) {
    var layer = e.target; //the target capture the object which the event associates with
    layer.setStyle({
        weight: 8,
        opacity: 0.8,
        color: '#e3e3e3',
        fillColor: '#1ce3d7',
        fillOpacity: 0.5
    });
    // bring the layer to the front.
    layer.bringToFront();
    // select the update class, and update the contet with the input value.
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    //$(".update").html("Hover over a state");
};

var geojson;
// ... our listeners

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        click: onMapClick,
        mouseout: resetHighlight
    });
}
//mymap.on('click', onMapClick);

// 3.4 assign the geojson data path, style option and onEachFeature option. And then Add the geojson layer to the map.
geojson = L.geoJson.ajax("assets/us-states.geojson", {
    style: style,
    onEachFeature: onEachFeature
}   ).addTo(mymap);

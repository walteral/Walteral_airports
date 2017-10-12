"# Walteral_airports" 

Project Name:
United States Airports by Control Towers

Project Introduction:
The purpose of this project was to show where within the United States all of the airports are located, whether or not that airport has a control tower associated with it or not, and to show a chloropleth map of how many control towers are in each state.

Major Function:
SetBaseMap = sets a base map based on a dropdown choice from the user
changeBaseMap = changes the basemap given the choice from the user
OnEachFeature = popups the name of an airport when clicked
pointToLayer = changed the icons of airports with control towers and those without
setColor = sets the color ramp based on the number of airports in a state
style = fills the 'states' layer with the colors from setColor
highlightFeature = changes a targets display values
resetHighlight = resets a change to the original display values

Libraries used:
Leaflet
esri-Leaflet
Leaflet-ajax
Jquery
Chroma

Data Sources:
Bo Zhao

Credit:
Map created by Alex Walters while taking GEOG 371 in Oregon State University

Acknowledgement:
Esri leaflet for providing an example code to switch basemaps

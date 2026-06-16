
var kerala = ee.FeatureCollection(
  "projects/project-1-497107/assets/Kerala_District_Boundary"
);


print('Properties', kerala.first());

var aoi = kerala.filter(
  ee.Filter.eq('DISTRICT', 'Kottayam')
);


Map.centerObject(aoi, 9);
Map.addLayer(aoi, {color:'red'}, 'Kottayam');

var ndvi = ee.ImageCollection("MODIS/061/MOD13Q1")
  .filterBounds(aoi)
  .filterDate('2015-01-01', '2023-12-31')
  .select('NDVI');
  
ndvi = ndvi.map(function(img){
  return img.multiply(0.0001)
      .copyProperties(img, ['system:time_start']);
});

var ndvi_min = ndvi.min();
var ndvi_max = ndvi.max();

var ndvi_current = ndvi
  .filterDate('2015-01-01', '2023-12-31')
  .mean();
  
var vci = ndvi_current
  .subtract(ndvi_min)
  .divide(ndvi_max.subtract(ndvi_min))
  .rename('VCI');
  
Map.addLayer(
  vci.clip(aoi),
  {
    min:0,
    max:1,
    palette:['red','yellow','green']
  },
  'VCI');
  
var drought = vci.expression(
"(b('VCI') < 0.2) ? 1" +
": (b('VCI') < 0.4) ? 2" +
": (b('VCI') < 0.6) ? 3" +
": 4"
).rename('Drought');

Map.addLayer(
  drought.clip(aoi),
  {
    min:1,
    max:4,
    palette:['red','orange','yellow','green']
  },
  'Drought Class');
  
var areaImage = ee.Image.pixelArea()
  .divide(1000000)
  .addBands(drought);
  
var stats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'class'
  }),
  geometry: aoi.geometry(),
  scale:250,
  maxPixels:1e13
});
print('Area Statistics (sq km)', stats);


Export.image.toDrive({
  image: drought,
  description: 'VCI_Drought_Map',
  region: aoi.geometry(),
  scale: 250,
  maxPixels: 1e13
});



var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});


legend.add(ui.Label({
  value: 'VCI Drought Classes',
  style: {fontWeight: 'bold', fontSize: '14px'}
}));


var colors = ['red', 'orange', 'yellow', 'green'];
var names = [
  'VCI < 0.2 : Extreme Drought',
  '0.2 - 0.4 : Moderate Drought',
  '0.4 - 0.6 : Mild Drought',
  'VCI > 0.6 : Normal'
];

for (var i = 0; i < colors.length; i++) {
  legend.add(
    ui.Panel([
      ui.Label('', {
        backgroundColor: colors[i],
        padding: '8px',
        margin: '0 5px 4px 0'
      }),
      ui.Label(names[i])
    ], ui.Panel.Layout.Flow('horizontal'))
  );
}
Map.add(legend);

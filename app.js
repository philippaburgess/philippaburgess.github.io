import { Ion, Viewer, Cesium3DTileset, IonResource, Math as CesiumMath } from 'cesium';
import { Loader } from '@googlemaps/js-api-loader';

const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODMwMDg5ZC0wYjJlLTQ2NmEtOTg5Ny1iMzI0NzNjMjU5YjYiLCJpZCI6MTczNDE4LCJpYXQiOjE2OTk4NTI5NDh9.VtT7XV6WVveRJijzrNyZLOsooZ6p14yChusoetLIL54';
// Create the Cesium Viewer with Bing Maps Aerial as the base imagery layer.

// Create a Cesium viewer with the Google Photorealistic 3D Tiles as the imagery provider.
const viewer = new Viewer('cesiumContainer', {
  imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }), // Assuming assetId 2 is your Google Photorealistic 3D Tiles
  terrainProvider: new Cesium.CesiumTerrainProvider({
    url: IonResource.fromAssetId(1) // Assuming assetId 1 is Cesium World Terrain
  }),
  baseLayerPicker: false, // Hide the base layer picker
  // ... other viewer options
});

// Load the Google Photorealistic 3D Tiles and Cesium OSM Buildings
const google3DTileset = new Cesium3DTileset({ 
  url: IonResource.fromAssetId(2275207) // Your Google Photorealistic 3D Tiles asset ID
});
const osmBuildingsTileset = new Cesium3DTileset({ 
  url: IonResource.fromAssetId(96188) // Your Cesium OSM Buildings asset ID
});

const tileset = viewer.scene.primitives.add(
  await Cesium.Cesium3DTileset.fromIonAssetId(2358501)
);

viewer.scene.primitives.add(google3DTileset);
viewer.scene.primitives.add(osmBuildingsTileset);

Cesium3DTileset.fromIonAssetId(2275207)
  .then(tileset => {
    viewer.scene.primitives.add(tileset);
  })
  .catch(error => {
    console.error("Error loading Google Photorealistic 3D Tiles:", error);
  });

Cesium3DTileset.fromIonAssetId(96188)
  .then(tileset => {
    viewer.scene.primitives.add(tileset);
  })
  .catch(error => {
    console.error("Error loading Cesium OSM Buildings:", error);
  });


// Fly the camera to the Port of Long Beach
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-118.2153, 33.7550, 1500),
  orientation: {
    heading: CesiumMath.toRadians(0),
    pitch: CesiumMath.toRadians(-30),
    roll: 0.0
  }
});

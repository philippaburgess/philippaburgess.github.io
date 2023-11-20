import { Ion, Viewer, Cesium3DTileset, IonResource, Math as CesiumMath } from 'cesium';

// Create a Cesium viewer with appropriate settings
const viewer = new Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain(),
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  sceneModePicker: false,
  selectionIndicator: false,
  timeline: false,
  navigationHelpButton: false,
  fullscreenButton: false
});

// Set the default access token for Cesium
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODMwMDg5ZC0wYjJlLTQ2NmEtOTg5Ny1iMzI0NzNjMjU5YjYiLCJpZCI6MTczNDE4LCJpYXQiOjE2OTk4NTI5NDh9.VtT7XV6WVveRJijzrNyZLOsooZ6p14yChusoetLIL54';

// Load the Google Photorealistic 3D Tiles
Cesium3DTileset.fromIonAssetId(2275207)
  .then(tileset => {
    viewer.scene.primitives.add(tileset);
  })
  .catch(error => {
    console.error("Error loading Google Photorealistic 3D Tiles:", error);
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

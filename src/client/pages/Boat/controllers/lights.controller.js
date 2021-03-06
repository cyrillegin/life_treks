/*
    lights.controller.js
    Authors: Cyrille Gindreau

    initLights()
    Creates two lights: a sun and a backlight, and adds them to the scene.


*/
import { SpotLight, AmbientLight } from 'three/build/three.module';

function initLights(app) {
  // Create main light.
  const sun = new SpotLight(0xffffff, 1);
  sun.position.set(0, 20, 0);
  sun.angle = 45;
  sun.decay = 0;
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 80000;
  app.scene.add(sun);
  app.lights.sun = sun;

  // Create backlight.
  const backlight = new AmbientLight(0xffffff, 0.3);
  backlight.position.set(10, -10, -10);
  app.scene.add(backlight);
  app.lights.backlight = backlight;
  return app;
}

export default initLights;

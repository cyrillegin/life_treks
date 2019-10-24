/* eslint-disable no-param-reassign */
import { Scene, PCFSoftShadowMap, WebGLRenderer } from 'three/build/three.module';
import TWEEN from '@tweenjs/tween.js';

function initScene(container) {
  const app = {
    scene: new Scene(),
    camera: null,
    cameraControls: null,
    lights: {},
    meshes: {},
    renderer: new WebGLRenderer({
      antialias: true,
      alpha: true,
    }),
    container,
    loaded: false,
    render: () => {
      app.renderer.render(app.scene, app.camera);
      TWEEN.update();
      requestAnimationFrame(app.render);
    },
  };

  app.renderer.shadowMap.enabled = true;
  app.renderer.shadowMap.type = PCFSoftShadowMap;
  app.renderer.gammaInput = true;
  app.renderer.gammaOutput = true;
  app.renderer.autoClear = false;
  app.renderer.sortObjects = false;
  app.renderer.setSize(app.container.offsetWidth, app.container.offsetHeight);

  app.renderer.setClearColor(0xffffff, 0);

  app.container.appendChild(app.renderer.domElement);
  return app;
}

export default initScene;

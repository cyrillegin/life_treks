import 'three';
import 'three/examples/js/loaders/OBJLoader';
import 'three/examples/js/controls/OrbitControls';

export default class threejs {

    constructor($scope) {
        const container = document.getElementById('renderer');
        const app = this.doThree();
        app.init(container);
        app.render();
        // resize();
    }

    doThree() {
        const app = {
            meshes: {},
            displayedMesh: null,
            currentScene: null,
            loaded: false,
            camera: null,
            sun: null,
            scene: null,
            renderer: null,
            cameraControls: null,
            init(container) {
                let backlight = null;
                app.loaded = false;
                app.container = container;
                if (app.scene === null) {
                    app.scene = new THREE.Scene();
                    initRenderer();
                    initCamera();
                    initLights();
                }
                function initRenderer() {
                    app.renderer = new THREE.WebGLRenderer({
                        antialias: true,
                        alpha: true,
                    });
                    app.renderer.shadowMap.enabled = true;
                    app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    app.renderer.gammaInput = true;
                    app.renderer.gammaOutput = true;
                    app.renderer.autoClear = false;
                    app.renderer.sortObjects = false;
                    app.renderer.setSize(container.offsetWidth, container.offsetHeight);

                    app.renderer.setClearColor(0xffffff, 0);
                    container.appendChild(app.renderer.domElement);
                    $(app.renderer.domElement).css('position', 'absolute');
                }

                // Create lights
                function initLights() {
                    app.sun = new THREE.SpotLight(0xffffff, 1);
                    app.sun.position.set(-60, 60, 60);
                    app.sun.angle = 1.1;
                    app.sun.decay = 0;
                    app.sun.castShadow = true;

                    app.sun.shadow.mapSize.width = 2048;
                    app.sun.shadow.mapSize.height = 2048;
                    app.sun.shadow.camera.near = 1;
                    app.sun.shadow.camera.far = 80000;
                    app.scene.add(app.sun);
                    backlight = new THREE.AmbientLight(0xffffff, 0.3);
                    backlight.position.set(10, -10, -10);
                    app.scene.add(backlight);
                }

                // Create Camera and attach OrbitControls.js
                function initCamera() {
                    app.camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 2, 80000);
                    app.camera.position.set(25, 15, 0);
                    app.camera.lookAt(app.scene.position);
                    app.cameraControls = new THREE.OrbitControls(app.camera, app.renderer.domElement);
                }

                // Create meshes
                function initMesh() {
                    if (app.displayedMesh !== null) {
                        app.scene.remove(app.displayedMesh);
                    }
                    if (app.displayedMesh === null) {
                        const objLoader = new THREE.OBJLoader();
                        objLoader.load(
                            'models/pi.obj',
                            (object) => {
                                app.scene.add(object);
                                app.displayedMesh = object;
                            },
                            // called when loading is in progresses
                            (xhr) => {
                                console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
                            },
                            // called when loading has errors
                            (error) => {
                                console.log('An error happened');
                            },
                        );
                    } else {
                        app.scene.add(app.meshes[name]);
                        app.displayedMesh = app.meshes[name];
                    }
                }
                initMesh();
            },

            render() {
                if (app.loaded && app.displayedMesh) {
                    app.displayedMesh.rotation.y += 0.001; // eslint-disable-line
                }

                if (!app.loaded && app.displayedMesh) {
                    app.sun.target = app.displayedMesh;
                    app.loaded = true;
                    app.renderer.setSize(app.container.offsetWidth, app.container.offsetHeight);
                    app.hide = false;
                }
                if (app.renderer) {
                    app.renderer.render(app.scene, app.camera);
                    requestAnimationFrame(app.render);
                }
            },
            destroy() {
                app.renderer.forceContextLoss();
                app.renderer.context = null;
                app.renderer.domElement = null;
                app.renderer = null;
            },
        };
        return app;
    }
}

import * as THREE from 'three';

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
                if (app.scene === null) {
                    app.scene = new THREE.Scene();
                    initRenderer();
                    initCamera();
                    initLights();
                }
                // Create Renderer
                function initRenderer() {
                    app.renderer = new THREE.WebGLRenderer({
                        antialias: true,
                        // alpha: true,
                    });
                    // app.renderer.shadowMap.enabled = true;
                    // app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    app.renderer.gammaInput = true;
                    app.renderer.gammaOutput = true;
                    app.renderer.autoClear = false;
                    app.renderer.sortObjects = false;
                    app.renderer.setSize(600, 300);
                    app.renderer.setClearColor(0x000000, 0);
                    container.appendChild(app.renderer.domElement);
                    $(app.renderer.domElement).css('position', 'absolute');
                }

                // Create lights
                function initLights() {
                    app.sun = new THREE.SpotLight(0xffffff, 100);
                    app.sun.position.set(-6, 6, 6);
                    app.sun.angle = 1.1;
                    app.sun.decay = 0;
                    // app.sun.castShadow = true;
                    //
                    // app.sun.shadow.mapSize.width = 2048;
                    // app.sun.shadow.mapSize.height = 2048;
                    // app.sun.shadow.camera.near = 1;
                    // app.sun.shadow.camera.far = 80000;
                    app.scene.add(app.sun);
                    backlight = new THREE.AmbientLight(0x00ffff, 10.3);
                    backlight.position.set(10, -10, -10);
                    app.scene.add(backlight);
                }

                // Create Camera and attach OrbitControls.js
                function initCamera() {
                    app.camera = new THREE.PerspectiveCamera(45, 600 / 300, 2, 80000);
                    app.camera.position.set(10, 5, 0);
                    app.camera.lookAt(app.scene.position);
                    // app.cameraControls = new THREE.OrbitControls(app.camera, app.renderer.domElement);
                }

                // Create meshes
                function initMesh() {
                    if (app.displayedMesh !== null) {
                        app.scene.remove(app.displayedMesh);
                    }
                    if (app.displayedMesh === null) {
                        const loader = new THREE.JSONLoader();
                        loader.load(('models/arduino.json'), (geometry, materials) => {
                            const mesh = new THREE.Mesh(geometry, materials);
                            mesh.doubleSided = true;
                            // mesh.castShadow = true;
                            // mesh.receiveShadow = true;
                            mesh.position.set(0, 0, 0);
                            mesh.name = name;
                            app.meshes[name] = mesh;
                            app.scene.add(mesh);
                            app.displayedMesh = mesh;
                            app.loaded = true;
                        });
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
                    app.renderer.setSize(container.offsetWidth, container.offsetHeight);
                    app.hide = false;
                    // curLoading = false;
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

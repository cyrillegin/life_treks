import 'three';
import 'three/examples/js/loaders/OBJLoader';
import 'three/examples/js/controls/OrbitControls';

export default class threejs {

    constructor() {
        const container = document.getElementById('renderer');
        const app = this.createApp();
        app.init(container);
        app.render();
    }

    createApp() {
        const app = {
            meshes: [],
            currentScene: null,
            loaded: false,
            camera: null,
            sun: null,
            scene: null,
            renderer: null,
            cameraControls: null,
            backlight: null,
            container: null,
            loaded: false,
            loadMesh: this.loadMesh,
            init(container) {
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
                    app.backlight = new THREE.AmbientLight(0xffffff, 0.3);
                    app.backlight.position.set(10, -10, -10);
                    app.scene.add(app.backlight);
                }
                function initCamera() {
                    app.camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 2, 80000);
                    app.camera.position.set(25, 15, 0);
                    app.camera.lookAt(app.scene.position);
                    app.cameraControls = new THREE.OrbitControls(app.camera, app.renderer.domElement);
                }

                // Create meshes
                async function initMesh() {
                    const ras1 = await app.loadMesh('models/pi.obj');
                    const ras2 = ras1.clone();
                    ras1.position.z = -15; // eslint-disable-line
                    ras2.position.z = 15; // eslint-disable-line
                    app.scene.add(ras1);
                    app.meshes.push(ras1);
                    app.scene.add(ras2);
                    app.meshes.push(ras2);
                    buildArcs();
                }

                function buildArcs() {
                    const loader = new THREE.TextureLoader();
                    const texture = loader.load('textures/UV_Grid_Sm.jpg');

                    const group = new THREE.Group();
                    group.position.z = 15;
                    app.scene.add(group);

                    // it's necessary to apply these settings in order to correctly display the texture on a shape geometry
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(0.008, 0.008);

                    function addLineShape(shape, color, x, y, z, rx, ry, rz, s) {
                        // lines
                        shape.autoClose = true;
                        const spacedPoints = shape.getSpacedPoints(40);
                        const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints(spacedPoints);

                        const particles = new THREE.Points(geometrySpacedPoints, new THREE.PointsMaterial({color: color, size: 1}));
                        particles.position.set(x, y, z);
                        particles.rotation.set(rx, ry, rz);
                        particles.scale.set(s, s, s);
                        group.add(particles);
                    }

                    var arc = new THREE.Path();
                    arc.moveTo(0, 0);
                    // arc.quadraticCurveTo(60, 0, 0, 60);
                    arc.bezierCurveTo(10, 10, 20, 10, 30, 0);
                    // arc.quadraticCurveTo(40, 80, 20, 60);
                    // arc.quadraticCurveTo(5, 50, 20, 40);

                    addLineShape(arc, 0x008000, 0, 0, 0, 0, Math.PI * 0.5, 0, 1);
                }
                initMesh();
            },

            render() {
                if (!app.loaded && app.meshes.length > 0) {
                    app.sun.target = app.meshes[0];
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

    loadMesh(file) {
        return new Promise((resolve, reject) => {
            const objLoader = new THREE.OBJLoader();
            objLoader.load(
                file,
                (object) => {
                    resolve(object);
                },
                // called when loading is in progresses
                (xhr) => {
                    console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
                },
                // called when loading has errors
                (error) => {
                    console.log('An error happened');
                    reject(error);
                },
            );
        });
    }
}

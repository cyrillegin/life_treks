import 'three';
import 'three/examples/js/loaders/OBJLoader';
import 'three/examples/js/controls/OrbitControls';

export default class threejs {

    constructor($scope, $http) {
        'ngInject';
        const container = document.getElementById('renderer');
        const app = this.createApp();
        app.init(container);
        app.render();
        this.$http = $http;
        this.$scope = $scope;
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
            getReadings: this.getReadings,
            mouse: null,
            raycaster: null,
            INTERSECTED: null,
            arcs: [],
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
                    app.sun.position.set(40, 20, 40);
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
                    app.camera.position.set(-20, 15, 20);
                    app.camera.lookAt(app.scene.position);
                    app.cameraControls = new THREE.OrbitControls(app.camera, app.renderer.domElement);
                    app.cameraControls.maxPolarAngle = Math.PI / 2.5;
                    app.raycaster = new THREE.Raycaster();
                    app.mouse = new THREE.Vector2();
                    // function onDocumentMouseMove(event) {
                    //     event.preventDefault();
                    //     app.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    //     app.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
                    // }
                    // document.addEventListener('mousemove', onDocumentMouseMove, false);
                }

                // Create meshes
                function initMesh() {
                    app.loadMesh('models/apartment.obj').then((apartment) => {
                        apartment.position.set(-8.6, 0, 7.2);
                        app.scene.add(apartment);
                        app.meshes.push(apartment);
                    });

                    const home = new THREE.Vector3(0, 6.3, 0);

                    const ras1 = new THREE.Vector3(-0.5, 3, 11.5);
                    buildArc(home, ras1);

                    const ras2 = new THREE.Vector3(-0.5, 4, -21);
                    buildArc(home, ras2);

                    const ras3 = new THREE.Vector3(-18, 2.7, 12);
                    buildArc(home, ras3);

                    const group = new THREE.Group();
                    app.scene.add(group);

                    // TODO: This needs to be implemented once dragonfly is accessable.
                    // const squareShape = new THREE.Shape();
                    // squareShape.moveTo(-4, -2);
                    // squareShape.lineTo(4, -2);
                    // squareShape.lineTo(4, 2);
                    // squareShape.lineTo(-4, 2);
                    // squareShape.lineTo(-4, -2);

                    // const loader = new THREE.FontLoader();
                    // loader.load('fonts/helvetikar_bold.typeface.json', (font) => {
                    //     console.log(font)
                    //     const geometry = new THREE.TextGeometry('Hello three.js!', {
                    //         font: font,
                    //         size: 80,
                    //         height: 5,
                    //         curveSegments: 12,
                    //         bevelEnabled: true,
                    //         bevelThickness: 10,
                    //         bevelSize: 8,
                    //         bevelSegments: 5
                    //     });
                    //     const mesh = new THREE.Mesh(geometry);
                    //     group.add(mesh);
                    //     app.billboard = group;
                    // });


                    // const geometry = new THREE.ShapeBufferGeometry(squareShape);
                    // const mesh = new THREE.Mesh(geometry);

                    // app.getReadings();
                    // group.add(mesh);
                    // app.billboard = group;
                }

                function buildArc(start, end) {
                    const group = new THREE.Group();
                    app.scene.add(group);

                    const A = end.x - start.x;
                    const B = end.z - start.z;
                    const C = Math.sqrt(A ** 2 + B ** 2);
                    const a = Math.atan2(B, A);

                    const arc = new THREE.Path();
                    arc.moveTo(0, 0);
                    const third = C / 3;
                    arc.bezierCurveTo(third, third / 2, third * 2, third, C, end.y - start.y);

                    arc.autoClose = true;
                    const spacedPoints = arc.getSpacedPoints(C * 6);
                    const geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints(spacedPoints);

                    const particles = new THREE.Points(geometrySpacedPoints, new THREE.PointsMaterial({color: 0x008000, size: 0.2}));
                    particles.position.set(start.x, start.y, start.z);

                    particles.rotation.set(0, a, 0);
                    particles.scale.set(1, 1, 1);

                    // Calculate midpoint for attaching banner.
                    const midpoint = new THREE.Vector3((start.x + end.x) / 2, (start.y + end.y) / 2 + 1, (start.z + end.z) / 2);
                    particles.midpoint = midpoint;

                    group.add(particles);
                    app.arcs.push(particles);
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

                if (app.loaded) {
                    app.raycaster.setFromCamera(app.mouse, app.camera);
                    const intersects = app.raycaster.intersectObjects(app.arcs, true);

                    if (intersects.length > 0) {
                        if (app.INTERSECTED !== intersects[0].object) {
                            if (app.INTERSECTED) {
                                app.INTERSECTED.material.color.setHex(app.INTERSECTED.currentHex);
                            }
                            app.INTERSECTED = intersects[0].object;
                            app.INTERSECTED.currentHex = app.INTERSECTED.material.color.getHex();
                            app.INTERSECTED.material.color.setHex(0xff0000);
                            // app.billboard.visible = true;
                            // app.billboard.position.set(intersects[0].object.midpoint.x, intersects[0].object.midpoint.y, -intersects[0].object.midpoint.z);
                        }
                    } else {
                        if (app.INTERSECTED) {
                            app.INTERSECTED.material.color.setHex(app.INTERSECTED.currentHex);
                            // app.billboard.visible = false;
                        }
                        app.INTERSECTED = null;
                    }
                }

                if (app.renderer) {
                    if (app.INTERSECTED) {
                        // app.billboard.lookAt(app.camera.position);
                    }
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
                    // console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
                },
                // called when loading has errors
                (error) => {
                    console.log('An error happened');
                    reject(error);
                },
            );
        });
    }

    getReadings(station) {
        this.$http.post('/readings', {})
            .then((success) => {
                // console.log('success');
                // console.log(success);
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    }
}

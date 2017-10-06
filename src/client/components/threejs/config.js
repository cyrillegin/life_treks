// Configure Require.js
requirejs.config({ // eslint-disable-line
    // Default load path for js files
    baseUrl: '/static/js',
    shim: {
        // --- Use shim to mix together all THREE.js subcomponents
        threeCore: {
            exports: 'THREE',
        },
        OrbitControls: {
            deps: ['threeCore'],
            exports: 'THREE',
        },
        // --- end THREE sub-components
        detector: {
            exports: 'Detector',
        },
    },
    // Third party code lives in js/lib
    paths: {
        // --- start THREE sub-components
        threeCore: '/scripts/three/build/three.min',
        // threeCore: '../lib/three.min',
        OrbitControls: '/scripts/three/examples/js/controls/OrbitControls',
        // --- end THREE sub-components
        detector: '/scripts/three/examples/js/Detector',

        // Require.js plugins
        text: 'lib/text',

        viewer: 'app/3dViewer',

    },
});

requirejs(['hardwareIndex']);

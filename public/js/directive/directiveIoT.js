(function () {

    app.directive('widgetIot', [function () {

        return {
            templateUrl: 'templates/directive/directiveIoT.html',
            restrict: 'E',
            scope: {},
            link: function ($scope) {
                // Define some variables
                var camera, scene, renderer, geometry, material, mesh;

                // Show qrCode
                $scope.showQRCode = true;

                // Init the renderer
                init();
                animate();

                function init() {

                    scene = new THREE.Scene();

                    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 10000);
                    camera.position.z = 500;
                    scene.add(camera);

                    geometry = new THREE.CubeGeometry(50, 50, 50);
                    material = new THREE.MeshNormalMaterial();
                    mesh = new THREE.Object3D();
                    mesh1 = new THREE.Mesh(geometry, material);
                    mesh1.position.x = -50;
                    mesh2 = new THREE.Mesh(geometry, material);
                    mesh3 = new THREE.Mesh(geometry, material);
                    mesh3.position.x = 50;

                    mesh.add(mesh1);
                    mesh.add(mesh2);
                    mesh.add(mesh3);

                    scene.add(mesh);
                    scene.background = new THREE.Color(0xffffff);

                    renderer = new THREE.WebGLRenderer();
                    renderer.setSize(250, 200);

                    document.getElementById('renderIoT').appendChild(renderer.domElement);
                }

                function animate() {
                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                }

                $scope.$on('event:grovepi-' + $scope.$root.dashboard + '_iot', function (event, message) {
                    $scope.showQRCode = false;
                    console.log(message);
                    mesh.rotation.x += 0.01;
                    mesh.rotation.y += 0.02;
                    renderer.render(scene, camera);
                });
            }
        };
    }]);
})();
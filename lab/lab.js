


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 15, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // antialias 反鋸齒
renderer.setSize(innerWidth, innerHeight); 
renderer.setPixelRatio(window.devicePixelRatio); //將像素比率設定跟螢幕的像素比率一樣 <就是比較清晰啦>
renderer.toneMapping = THREE.ACESFilmicToneMapping;//降低對比 避免白色過曝 且保留細節
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFsoftShadowMap;
document.body.appendChild(renderer.domElement);


const sunlight = new THREE.DirectionalLight(new THREE.Color("#FFFFFF"), 3.5);
sunlight.position.set(10, 20, 10);
sunlight.castShadow = true;
sunlight.shadow.mapSize.width = 512;
sunlight.shadow.mapSize.height = 512;
sunlight.shadow.camera.near = 0.5;
sunlight.shadow.camera.far = 100;
sunlight.shadow.camera.left = -10;
sunlight.shadow.camera.bottom = -10;
sunlight.shadow.camera.top = 10;
sunlight.shadow.camera.rigth = 10;
scene.add(sunlight);



let pmrem = new THREE.PMREMGenerator(renderer);
let envmapTexture = new THREE.RGBELoader().load('../img/half earth.hdr');
let envMap = pmrem.fromEquirectangular(envmapTexture);

const loader = new THREE.TextureLoader();
   const bump = loader.load('../img/earthbump.jpg');
   const map = loader.load('../img/earthmap.jpg');
   const spec = loader.load('../img/earthspec.jpg');

const earth = new THREE.Mesh(
    new THREE.SphereGeometry(10, 70, 70),
    new THREE.MeshPhysicalMaterial({
        map: map,
        roughnessMap: spec,
        bumpMap: bump,
        bumpScale: 0.65,
        envMap,
        envMapIntensity: 1,
        sheen: 1,
        sheenRoughness: 0.75,
        sheenColor: new THREE.Color("#4a1b87").convertSRGBToLinear(),
        clearcoat: 0.5,

    })
);
earth.receiveShadow = true;
scene.add(earth);




const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0,0,0);
controls.dampingFactor = 0.05;
controls.enableDamping = true;



function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();



        const scene = new THREE.Scene();


        // const camera = new THREE.PerspectiveCamera(
        //     75,
        //     window.innerWidth / window.innerHeight,
        //     0.1,
        //     1000
        // );

        // const renderer = new THREE.WebGLRenderer({
        //   canvas: canvas,
        // alpha: true
        // });
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild(renderer.domElement);


        const loader = new THREE.TextureLoader();
        const height = loader.load('./lab/threejs-webpack-starter-master/static/height.png')
        const texture = loader.load('./lab/threejs-webpack-starter-master/static/texture.jpg')
        const alpha = loader.load('./lab/threejs-webpack-starter-master/static/alpha.png')
                
        // loader.load('./img/BG.png', function (texture) {
        //     scene.background = texture;
        // });

        // const geometry = new THREE.SphereGeometry(1, 32, 32);
        // const textureLoader = new THREE.TextureLoader();
        // const texture1 = textureLoader.load('./img/original.jpg');
        // const material = new THREE.MeshBasicMaterial({ map: texture1 });
        // const cube = new THREE.Mesh(geometry, material);
        // scene.add(cube);

        const canvas = document.querySelector('canvas.webgl')

        const geometry1 = new THREE.PlaneBufferGeometry(5,5,64,64);
        const material1 = new THREE.MeshStandardMaterial({
          color: 'gray',
          map: texture,
          displacementMap: height,
          displacementScale: .6,
          alphaMap: alpha,
          transparent: true,
          depthTest: false
      })
      
      const plane = new THREE.Mesh(geometry1,material1)
      scene.add(plane);
      plane.rotation.x  = 181;

      const pointLight = new THREE.PointLight('#00b3ff', 2)
      pointLight.position.x = .2
      pointLight.position.y = 10
      pointLight.position.z = 4.4
      scene.add(pointLight)

       


        // const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
        // directionalLight.castShadow = true;
        // directionalLight.shadow.mapSize.width = 2048;
        // directionalLight.shadow.mapSize.height = 2048;
        // directionalLight.position.set(20, 20, 20);
        // scene.add(directionalLight);

        // camera.position.set(2, 1.5, 3);
        // camera.lookAt(plane.position);

        const sizes = {
          width: window.innerWidth,
          height: window.innerHeight
      }

      window.addEventListener('resize', () =>
      {
          // Update sizes
          sizes.width = window.innerWidth*0.7
          sizes.height = window.innerHeight
      
          // Update camera
          camera.aspect = sizes.width / sizes.height
          camera.updateProjectionMatrix()
      
          // Update renderer
          renderer.setSize(sizes.width, sizes.height)
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

      const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
      camera.position.x = 0
      camera.position.y = 0
      camera.position.z = 3
      scene.add(camera)

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    document.addEventListener('mousemove', animateTerrain)

    let mouseY = 0
    
    function animateTerrain(event){
        mouseY = event.clientY
    }
    
    const clock = new THREE.Clock()
      

    const tick = () =>
    {
    
        const elapsedTime = clock.getElapsedTime()
    
        // Update objects
        // sphere.rotation.y = .5 * elapsedTime
    
    
            plane.rotation.z = .25 * elapsedTime
            plane.material.displacementScale = 0.5 + mouseY * 0.001
        // Update Orbital Controls
        // controls.update()
    
        // Render
        renderer.render(scene, camera)
    
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    
    tick()

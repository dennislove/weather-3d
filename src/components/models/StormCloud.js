import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StormCloud = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x11111f, 0.002);

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 1);
    camera.rotation.set(1.16, -0.12, 0.27);

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Handle resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);

    // Add lights
    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    const flash = new THREE.PointLight(0x586aac, 50, 800, 2.5);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    // Load cloud textures
    const loader = new THREE.TextureLoader();
    const textures = [
      loader.load(
        '/vecteezy_rain-clouds-and-black-sky-textured-background_10123744_360-min.jpg'
      ),
      loader.load(
        '/vecteezy_rain-clouds-and-black-sky-textured-background_10121810_444-min.jpg'
      ),
      loader.load(
        '/vecteezy_rain-clouds-and-black-sky-textured-background_10121519_408-min.jpg'
      )
    ];

    const createClouds = (texture, opacity, count) => {
      const cloudParticles = [];
      const cloudGeometry = new THREE.PlaneGeometry(2000, 2000);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: opacity
      });

      for (let p = 0; p < count; p++) {
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
        );
        cloud.rotation.set(1.16, -0.12, Math.random() * 360);
        cloudParticles.push(cloud);
        scene.add(cloud);
      }
      return cloudParticles;
    };

    // Create clouds
    const cloudParticles1 = createClouds(textures[0], 0.8, 25);
    const cloudParticles2 = createClouds(textures[1], 0.6, 25);
    const cloudParticles3 = createClouds(textures[2], 0.8, 25);

    // Render function
    const render = () => {
      cloudParticles1.forEach((p) => {
        p.rotation.z -= 0.0004;
      });
      cloudParticles2.forEach((p) => {
        p.rotation.z -= 0.0002;
      });
      cloudParticles3.forEach((p) => {
        p.rotation.z -= 0.0003;
      });

      if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100)
          flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        flash.power = 50 + Math.random() * 500;
      }

      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();

    // Clean up on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute'
      }}
    />
  );
};

export default StormCloud;

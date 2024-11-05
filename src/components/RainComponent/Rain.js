import React, { useEffect, useState } from 'react';
import {
  BufferGeometry,
  BufferAttribute,
  Points,
  PointsMaterial,
  TextureLoader,
  AudioListener,
  Audio,
  AudioLoader
} from 'three';
import { useFrame } from '@react-three/fiber';

const Rain = ({ modelRef, rainIntensity, rainSpeed }) => {
  const [rain, setRain] = useState(null);
  const [texture, setTexture] = useState(null);
  const [sound, setSound] = useState(null); // State for audio

  useEffect(() => {
    // Load the raindrop texture
    const loader = new TextureLoader();
    loader.load('/rain_dot.png', (texture) => {
      setTexture(texture);
    });

    // Create geometry for the rain
    const geometry = new BufferGeometry();
    const positions = new Float32Array(rainIntensity * 3);

    for (let i = 0; i < rainIntensity; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150; // x position
      positions[i * 3 + 1] = Math.random() * 100; // y position
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z position
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3));

    // Use the texture for the PointsMaterial
    const material = new PointsMaterial({
      size: 1, // Adjust size for droplet effect
      sizeAttenuation: true,
      map: texture, // Use the loaded texture
      transparent: true, // Allow for transparency in the texture
      alphaTest: 0.5 // Threshold for rendering transparency
    });

    const points = new Points(geometry, material);
    setRain(points);

    // Set up audio listener and sound
    const audioListener = new AudioListener();
    if (modelRef.current) {
      modelRef.current.add(audioListener); // Add the listener to your camera or a parent object
    }

    const sound = new Audio(audioListener);
    const audioLoader = new AudioLoader();
    // audioLoader.load('/rain-amp-thunder-sound-254476.mp3', (buffer) => {
    //   sound.setBuffer(buffer);
    //   sound.setLoop(true);
    //   sound.setVolume(0.5);
    //   sound.play();
    // });

    setSound(sound); // Store the sound in state

    return () => {
      geometry.dispose();
      material.dispose();
      sound.stop(); // Stop the sound when the component unmounts
    };
  }, [rainIntensity, texture, modelRef]);

  useFrame(() => {
    if (rain) {
      const positions = rain.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        // Only modify the y position for falling effect
        positions[i] -= rainSpeed; // Move down

        // Reset raindrop position to the top if it goes below a certain threshold
        if (positions[i] < 0) {
          positions[i] = 100; // Reset to a height above the view
          positions[i - 1] = (Math.random() - 0.5) * 150; // Randomize x position
          positions[i + 1] = (Math.random() - 0.5) * 100; // Randomize z position
        }
      }
      rain.geometry.attributes.position.needsUpdate = true;
    }
  });

  return rain ? <primitive object={rain} position={[30, -20, 0]} /> : null;
};

export default Rain;

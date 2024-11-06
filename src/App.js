import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FBXModel from './components/models/FBXModel';
import Background from './components/models/Background';
import Rain from './components/RainComponent/Rain';
import Control from './components/Control';
import Tree from './components/models/Tree';
import StormCloud from './components/models/StormCloud';

function App() {
  const modelRef = useRef();

  // State lưu trữ các giá trị điều khiển
  const [rainSettings, setRainSettings] = useState({
    rainIntensity: 2000, // số lượng hạt mưa
    rainSpeed: 0.6 // tốc độ rơi
  });

  const [isLoading, setIsLoading] = useState(true);
  const handleStart = () => {
    setIsLoading(false);
  };
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'green',
        display: 'relative'
      }}
    >
      <div
        onClick={handleStart}
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
          alignItems: 'center',
          zIndex: isLoading ? 20 : -1
        }}
      >
        <h2>Click anywhere to start</h2>
      </div>
      <StormCloud />
      <Canvas camera={{ position: [0, 1, 5], fov: 60 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} castShadow />

        {/* Model FBX */}
        {/* <Rain modelRef={modelRef} {...rainSettings} /> */}

        <Background url="/house.fbx" modelProps={{ envMap: 1 }} />
        <FBXModel ref={modelRef} url="/CharacterMesh-VA.fbx" />
        <OrbitControls />
        {/* <Tree url="/tree.obj" /> */}
      </Canvas>
      {/* Control component để điều chỉnh cài đặt mưa */}
      <Control rainSettings={rainSettings} setRainSettings={setRainSettings} />
    </div>
  );
}

export default App;

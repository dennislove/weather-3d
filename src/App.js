import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Background from './components/Background';
import Rain from './components/RainComponent/Rain';
import Control from './components/Control';
import Man from './components/Character/Man';
import FBXModel from './components/Character/FBXModel';

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
  let corner = 90;
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
      <Canvas camera={{ position: [0, 1, corner], fov: 60 }} shadows>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 10, 5]} intensity={1} castShadow />

        {/* Model FBX */}
        {/* <Rain modelRef={modelRef} {...rainSettings} /> */}
        {/* <FBXModel /> */}
        <Background />

        <Man />
        <OrbitControls
          minDistance={corner} // Đặt khoảng cách mặc định là 30
          maxDistance={corner} // Ngăn thay đổi khoảng cách
          minPolarAngle={0} // Giới hạn góc xoay dọc
          maxPolarAngle={Math.PI} // Không vượt quá 360 độ
        />
      </Canvas>
      {/* Control component để điều chỉnh cài đặt mưa */}
      <Control rainSettings={rainSettings} setRainSettings={setRainSettings} />
    </div>
  );
}

export default App;

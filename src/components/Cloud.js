import React, { useEffect, forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const Cloud = ({ url }) => {
  const model = useLoader(OBJLoader, url);
  useEffect(() => {
    if (model) {
      model.traverse((child) => {
        if (child.isMesh) {
          // Giữ nguyên vật liệu gốc và thêm ánh sáng phát ra
          child.material.emissive = child.material.color; // Sử dụng màu sắc gốc
          child.material.emissiveIntensity = 0.5; // Cường độ phát sáng
        }
      });
    }
  }, [model]);
  return (
    <group scale={0.1}>
      <primitive object={model} scale={1} position={[200, -200, 0]} />
    </group>
  );
};

export default Cloud;

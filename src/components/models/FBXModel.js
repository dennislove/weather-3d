import React, { useEffect, forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const FBXModel = forwardRef(({ url }, ref) => {
  const model = useLoader(FBXLoader, url);

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
    <primitive
      object={model}
      ref={ref} // Gán ref cho đối tượng
      scale={0.1}
      position={[0, -20, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
});

export default FBXModel;

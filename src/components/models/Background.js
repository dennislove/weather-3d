import React, { useEffect, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Mesh, Material } from 'three';

const Background = ({ url, modelProps = {} }) => {
  const model = useLoader(FBXLoader, url);
  const originalMaterials = useRef({}); // Lưu trữ các material gốc

  useEffect(() => {
    if (model) {
      model.traverse((object) => {
        if (object instanceof Mesh) {
          // Kiểm tra xem material có phải là một instance của Material không
          if (object.material instanceof Material) {
            originalMaterials.current[object.uuid] = object.material.clone();
          } else if (Array.isArray(object.material)) {
            // Nếu material là một mảng, clone từng phần tử trong mảng
            originalMaterials.current[object.uuid] = object.material.map(
              (mat) => mat.clone()
            );
          }

          // Thiết lập các thuộc tính cần thiết
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = modelProps.envMap || 1; // Đặt giá trị mặc định là 1 nếu envMap không có
          object.material.roughness = 0.9;

          // Thiết lập màu emissive để giữ màu sắc gốc và tăng sáng
          const color = object.material.color;
          object.material.emissive = color;
          object.material.emissiveIntensity = 0.5;

          // Log mã màu của từng mesh trong model (cho mục đích debug)
          if (color) {
            console.log(`Mesh ${object.name} color: #${color.getHexString()}`);
          }
        }
      });
    }
  }, [model, modelProps.envMap]);

  return (
    <group scale={0.1}>
      <primitive object={model} scale={1} position={[300, -200, 0]} />
    </group>
  );
};

export default Background;

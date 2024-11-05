import React, { useEffect, useState } from 'react';
import { BufferGeometry, BufferAttribute, Points, PointsMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';

const RainSplash = ({ rainPositions, modelRef }) => {
  const splashCount = rainPositions.length; // Số lượng hạt mưa cần tạo hiệu ứng loang
  const [splashes, setSplashes] = useState(null); // Trạng thái cho hiệu ứng loang

  useEffect(() => {
    const geometry = new BufferGeometry();
    const positions = new Float32Array(splashCount * 3); // 3 giá trị cho mỗi hạt loang (x, y, z)

    // Tạo vị trí cho từng hạt loang từ vị trí của hạt mưa
    for (let i = 0; i < splashCount; i++) {
      positions[i * 3] = rainPositions[i * 3]; // X
      positions[i * 3 + 1] = rainPositions[i + 1]; // Y
      positions[i * 3 + 2] = rainPositions[i * 3 + 2]; // Z
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3));

    const material = new PointsMaterial({
      color: 0x0000ff,
      size: 0.2,
      sizeAttenuation: true
    });
    const points = new Points(geometry, material);

    setSplashes(points); // Lưu đối tượng Points vào state

    // Clean up khi component bị unmount
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [rainPositions]);

  // Trả về đối tượng Points nếu đã được tạo
  return splashes ? <primitive object={splashes} /> : null;
};

export default RainSplash;

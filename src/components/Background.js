import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function Background() {
  const bg = useGLTF('/models/scene.gltf');
  const animations = useAnimations(bg.animations, bg.scene);

  useEffect(() => {
    const action = animations.actions['Cube.002|Cube.002Action'];

    action.play();
  }, []);
  return <primitive object={bg.scene} scale={20} position={[90, -20, 0]} />;
}

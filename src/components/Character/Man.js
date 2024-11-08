import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function Man() {
  const man = useGLTF('/models/man_run.glb');
  const animations = useAnimations(man.animations, man.scene);

  useEffect(() => {
    const action = animations.actions.m;

    action.play();
  }, []);
  return <primitive object={man.scene} scale={0.2} position={[0, -20, 0]} />;
}

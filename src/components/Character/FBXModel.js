import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export default function FBXModel() {
  const man = useGLTF('/models/untitled.glb');
  const animations = useAnimations(man.animations, man.scene);

  useEffect(() => {
    const actionName = 'Armature|mixamo.com|Layer0'; // Exact name based on your log
    const action = animations.actions[actionName];

    // Check if the action exists before trying to play it
    if (action) {
      action.play();
    } else {
      console.warn(`Action '${actionName}' not found in animations.actions`);
    }
  }, [animations.actions]);

  return <primitive object={man.scene} scale={10} position={[0, -20, 0]} />;
}

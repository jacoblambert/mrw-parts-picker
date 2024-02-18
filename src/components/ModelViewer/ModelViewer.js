import React, { useEffect } from 'react';
import { useLoader, useThree} from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const Grid = () => {
  const { scene } = useThree();

  useEffect(() => {
    const grid = new THREE.GridHelper(500, 50); // Adjust size and divisions here
    scene.add(grid);

    return () => {
      scene.remove(grid);
    };
  }, [scene]);

  return null;
};


const FBXModel = ({ path }) => {
  const fbx = useLoader(FBXLoader, path);
  const { scene } = useThree();

  useEffect(() => {
    fbx.scale.set(0.05, 0.05, 0.05);
    fbx.traverse((child) => {
      if (child.isMesh) {
        console.log(child.material);
      }
    });
    scene.add(fbx);

    return () => {
      scene.remove(fbx);
    };
  }, [fbx, scene]);

  return null;
};

const ModelViewer = ({ modelPaths }) => {
  return (
    <div style={{ width: '99vw', height: '90vh', border: '2px solid black' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 50, 20]} />
        <ambientLight intensity={1} />
        <pointLight position={[0, 50, 20]} intensity={1} />
        <Grid />
        {modelPaths.map((path, index) => (
          <FBXModel key={index} path={path} />
        ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
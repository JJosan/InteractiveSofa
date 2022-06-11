import './App.css';
import React, { Suspense } from 'react';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { PresentationControls} from '@react-three/drei'

const Scene = () => {
  const sofa = useLoader(FBXLoader, "sofa.fbx");
  useFrame(({clock}) => {
    const t = clock.getElapsedTime();
    sofa.rotation.y = t
  })
  return <primitive object={sofa} scale={0.02} />;
};

function App() {
  return (
    <div className='app'>
      <Canvas>
        <ambientLight intensity={.2} color={"lightgreen"}/>
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
        <Suspense fallback={null}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[.5, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
            <Scene />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
    
  );
}

export default App;

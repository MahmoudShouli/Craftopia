import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { toast } from "react-toastify";

const Model = ({ url, onError }) => {
  try {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={1.5} />;
  } catch (err) {
    console.error("GLTF load error:", err);
    onError?.();
    return null;
  }
};

const ModelWrapper = ({ modelUrl, setError }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Suspense
      fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Loading model...</div>}
    >
      <Model
        url={modelUrl}
        onError={() => {
          if (!hasError) {
            toast.error("🚫 Failed to load 3D model");
            setHasError(true);
            setError(true);
          }
        }}
      />
      <OrbitControls />
    </Suspense>
  );
};

const ModelViewer = ({ modelUrl }) => {
  const [loadError, setLoadError] = useState(false);

  if (loadError || !modelUrl) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>🚫 No model to render.</p>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", background: "#f0f0f0", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <ModelWrapper modelUrl={modelUrl} setError={setLoadError} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;

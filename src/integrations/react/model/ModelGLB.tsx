/** @jsxImportSource react */

import { qwikify$ } from "@qwik.dev/react";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import { Group } from "three";
import { Canvas } from "@react-three/fiber";

export default function ModelCopy() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/src/models/model.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [animations, actions]);

  return (
    <group ref={group} scale={[1.5, 1.5, 1]}>
      <primitive object={scene} />
    </group>
  );
}

function SceneCopy() {
  return (
    <div className="">
      <Canvas gl={{ antialias: true }} dpr={[1, 1.5]} key="robot-copy">
        <directionalLight position={[-5, -5, 5]} intensity={5} />
        <Suspense fallback={null}>
          <Center position={[-0.5, -0.5, 0]}>
            <ModelCopy />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}

export const QModel = qwikify$(SceneCopy, { eagerness: "visible" });

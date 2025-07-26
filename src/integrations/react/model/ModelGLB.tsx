/** @jsxImportSource react */

import { qwikify$ } from "@qwik.dev/react";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import { Group } from "three";
import { Canvas } from "@react-three/fiber";

type Model = { model: "organicball" | "spring" };

function ModelCopy({ model }: Model) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(`/src/models/${model}.glb`);
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

function SceneCopy({
  model,
  styleCanvas,
  width,
  height,
}: {
  styleCanvas?: string;
  width: number;
  height: number;
} & Model) {
  return (
    <Canvas
      style={{ width, height }}
      className={styleCanvas}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      key={model}
      aria-hidden={true}
      aria-label={`3d model ${model}`}
    >
      <directionalLight position={[0, 0, 2]} intensity={5} />
      <Suspense fallback={null}>
        <Center position={[0, 0, 0]} scale={3}>
          <ModelCopy model={model} />
        </Center>
      </Suspense>
    </Canvas>
  );
}

export const QModel = qwikify$(SceneCopy, { eagerness: "visible" });

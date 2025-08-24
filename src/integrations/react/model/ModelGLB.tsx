/** @jsxImportSource react */

import { qwikify$ } from "@qwik.dev/react";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import { useRef, useEffect, Suspense } from "react";
import { Group } from "three";
import { Canvas } from "@react-three/fiber";

export type Model = {
  model: "spring" | "gordian" | "puff" | "pipe" | "cube" | "torus" | "greenball";
};
useGLTF.preload("/models/torus.glb");
useGLTF.preload("/models/pipe.glb");
useGLTF.preload("/models/cube.glb");
useGLTF.preload("/models/spring.glb");
useGLTF.preload("/models/puff.glb");
useGLTF.preload("/models/greenball.glb");
useGLTF.preload("/models/gordian.glb");

function ModelCopy({ model }: Model) {
  const group = useRef<Group>(null);

  const { scene, animations } = useGLTF(`/models/${model}.glb`, true);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [animations, actions]);

  return (
    <group ref={group} scale={[1.5, 1.5, 1]}>
      <primitive object={scene.clone()} />
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
  const scale = () => {
    switch (model) {
      case "puff":
        return 0.7;
      case "spring":
        return 1.3;
      case "greenball":
        return 0.8;
      default:
        return 0.5;
    }
  };

  return (
    <Canvas
      style={{ width, height }}
      className={styleCanvas}
      // gl={{ antialias }}
      // dpr={[1, 2]}
      key={Math.random()}
      aria-hidden={true}
      aria-label={`3d model ${model}`}
    >
      <directionalLight position={[0, 0, 2]} intensity={2} />
      <Suspense fallback={null}>
        <Center position={[0, 0, 0]} scale={scale()}>
          <ModelCopy model={model} />
        </Center>
      </Suspense>
    </Canvas>
  );
}

export const QModel = qwikify$(SceneCopy, { eagerness: "visible", clientOnly: true });

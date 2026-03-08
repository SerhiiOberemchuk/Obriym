import { component$, useVisibleTask$ } from "@builder.io/qwik";

const animatedBallPresets = {
  cube: {
    modelSrc: "/models/cube.glb",
    posterSrc: "/images/green-ball.png",
  },
  gordian: {
    modelSrc: "/models/gordian.glb",
    posterSrc: "/images/green-ball.png",
  },
  greenball: {
    modelSrc: "/models/greenball.glb",
    posterSrc: "/images/green-ball.png",
  },
  organicball: {
    modelSrc: "/models/organicball.glb",
    posterSrc: "/images/green-ball.png",
  },
  pipe: {
    modelSrc: "/models/pipe.glb",
    posterSrc: "/images/green-ball.png",
  },
  puff: {
    modelSrc: "/models/puff.glb",
    posterSrc: "/images/green-ball.png",
  },
  spring: {
    modelSrc: "/models/spring.glb",
    posterSrc: "/images/green.png",
  },
  torus: {
    modelSrc: "/models/torus.glb",
    posterSrc: "/images/green-ball.png",
  },
} as const;

export type AnimatedBallPreset = keyof typeof animatedBallPresets;

type AnimatedBallProps = {
  class?: string;
  width?: number;
  height?: number;
  preset: AnimatedBallPreset;

};

export default component$<AnimatedBallProps>(
  ({ class: className, width = 48, height = 48, preset = "greenball",  }) => {
    const presetConfig = animatedBallPresets[preset];
    const resolvedModelSrc = presetConfig.modelSrc;
    const resolvedPosterSrc = presetConfig.posterSrc;

    // The web component is registered only in the browser so SSR stays safe.
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      void import("@google/model-viewer");
    });

    return (
      <model-viewer
        class={className}
        // Model source can come from a named preset or be passed explicitly via props.
        src={resolvedModelSrc}
        // Start the embedded GLB animation automatically.
        autoplay
        animation-crossfade-duration="0"
        // Footer model is decorative, so camera controls stay disabled.
        camera-controls={false}
        disable-pan
        disable-zoom
        interaction-prompt="none"
        // Lazy loading prevents the footer asset from competing with above-the-fold content.
        loading="lazy"
        // Poster is shown while the model loads or if the browser fails to init WebGL.
        poster={resolvedPosterSrc}
        reveal="auto"
        // Slightly lower exposure softens the model highlights.
        exposure={0.82}
        tone-mapping="neutral"
        // We do not need a contact shadow for this tiny footer decoration.
        shadow-intensity="0"
        // Fixed box keeps the footer layout stable before and after hydration.
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: "block",
          overflow: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
    );
  },
);

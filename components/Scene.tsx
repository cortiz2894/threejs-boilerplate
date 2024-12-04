"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrthographicCamera } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { Effects } from "./Effects";
import { useEffect, useRef, useState } from "react";
import { AnimationController } from "./AnimationController/index";
import Container from "./Container/index";
import { AnimationOptions } from "@/types/animations";
import { INIT_ANIMATION } from "@/constants/animations";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(585);
  const [zoom, setZoom] = useState(135);

  const [animationState, setAnimationState] =
    useState<AnimationOptions>(INIT_ANIMATION);

  const { positionX, positionY, positionZ } = useControls("Camera controls", {
    positionX: { value: 0, min: -20, max: 20 },
    positionY: { value: 1.55, min: -20, max: 20 },
    positionZ: { value: 1, min: -20, max: 20 },
  });

  const toggleAnimation = (animationName: AnimationOptions) =>
    setAnimationState(animationName);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        const newZoom = (width / 624) * 142;
        setZoom(newZoom);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [containerWidth]);

  return (
    <Container>
      <section className="flex flex-col lg:flex-row gap-10 w-full">
        <div className="w-full lg:w-auto lg:flex-grow">
          <AnimationController toggleAnimation={toggleAnimation} />
        </div>
        <div
          className="w-full lg:w-1/2 max-w-[50vw] min-w-[585px] relative"
          style={{ aspectRatio: "16/11" }}
          ref={containerRef}
        >
          <Leva collapsed />
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: "95px",
              border: "2px solid white",
            }}
          >
            <OrthographicCamera
              makeDefault
              zoom={zoom}
              position={[positionX, positionY, positionZ]}
            />
            <Effects />
            <Model animationState={animationState} />
          </Canvas>
        </div>
      </section>
    </Container>
  );
}

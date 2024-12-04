"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrthographicCamera } from "@react-three/drei";
import { useControls, Leva } from "leva";
import { Effects } from "./Effects";
import { useRef, useState } from "react";
import Container from "./Container/index";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { positionX, positionY, positionZ } = useControls("Camera controls", {
    positionX: { value: 0, min: -20, max: 20 },
    positionY: { value: 1.55, min: -20, max: 20 },
    positionZ: { value: 2, min: -20, max: 20 },
  });

  return (
    <section className="flex flex-col lg:flex-row gap-10 w-full h-screen">
      <div className="w-full h-full relative" ref={containerRef}>
        <Leva collapsed />
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <OrthographicCamera
            makeDefault
            zoom={100}
            position={[positionX, positionY, positionZ]}
          />
          <Effects />
          <Model />
        </Canvas>
      </div>
    </section>
  );
}

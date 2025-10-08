"use client";

import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";
import { Leva } from "leva";
import { Effects } from "./Effects";
import { Suspense, useRef } from "react";

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="flex flex-col lg:flex-row gap-10 w-full h-screen">
      <div className="w-full h-full relative" ref={containerRef}>
        <Leva collapsed />
        <div className="w-full h-[calc(100%-80px)] absolute top-0 left-0 pointer-events-none z-0">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={1}
          >
            {/* <OrthographicCamera /> */}
            <Suspense fallback={null}>
              <Environment preset="city" environmentIntensity={0.5} />
              <ambientLight
                //@ts-ignore
                intensity={0.2}
              />
              <directionalLight
                position={[0, -10, 5]}
                intensity={2}
                color={"#da4907"}
              />
              <Model />
            </Suspense>

            <Effects />
          </Canvas>
        </div>
      </div>
    </section>
  );
}

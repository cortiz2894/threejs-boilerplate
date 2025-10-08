"use client";

import React, { useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Object3D } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.Material;
  };
};

type ModelProps = {} & JSX.IntrinsicElements["group"];

export function Model({ ...props }: ModelProps) {
  const groupRef = useRef<Object3D>(null);

  const { nodes, materials, animations } = useGLTF(
    "glb/3d-chrome-logo.glb"
  ) as GLTFResult;

  const { actions } = useAnimations(animations, groupRef);

  const emissiveMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        toneMapped: false,
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 13,
        metalness: 0.5,
        roughness: 0.5,
      }),
    []
  );

  const reflectiveBackgroundMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#000000"),
        metalness: 1,
        envMapIntensity: 1,
        roughness: 0,
      }),
    []
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <mesh
        castShadow
        receiveShadow
        //@ts-ignore
        geometry={nodes["Recurso_1mountains-v3"].geometry}
        //@ts-ignore
        material={materials["Material.001"]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.198}
      />
    </group>
  );
}

useGLTF.preload("glb/3d-chrome-logo.glb'");

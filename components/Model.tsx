"use client";

import React, { useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Object3D } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

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
  const group = useRef<Object3D>(null);

  const { nodes, materials, animations } = useGLTF(
    "glb/basic_mesh.glb"
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);

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

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={emissiveMaterial}
        position={[0, 1.769, -0.103]}
        rotation={[0.798, 0.792, 0]}
      />
    </group>
  );
}

useGLTF.preload("glb/basic_mesh.glb");

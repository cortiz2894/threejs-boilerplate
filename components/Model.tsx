"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Object3D } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { INIT_ANIMATION } from "@/constants";

type GLTFResult = GLTF & {
  nodes: {
    background: THREE.Mesh;
    Circle001: THREE.Mesh;
    Circle001_1: THREE.Mesh;
    Circle008: THREE.Mesh;
    Circle008_1: THREE.Mesh;
    Plane: THREE.Mesh;
    Plane001: THREE.Mesh;
  };
  materials: {
    gradient: THREE.Material;
  };
};

type ModelProps = {
  animationState: string;
} & JSX.IntrinsicElements["group"];

export function Model({ animationState, ...props }: ModelProps) {
  const group = useRef<Object3D>(null);
  const introPlanes = useRef<Object3D>(null);

  const { nodes, materials, animations } = useGLTF(
    "/glb/proxie_animations_v4.glb"
  ) as GLTFResult;

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions[animationState];
    if (action) {
      action.reset().fadeIn(0.5).play();

      if (introPlanes.current) {
        introPlanes.current.visible = animationState === INIT_ANIMATION;
      }

      return () => {
        action.fadeOut(0.5);
      };
    }
  }, [animationState, actions]);

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

  const introBars = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#ffffff"),
        toneMapped: false,
        emissive: new THREE.Color("#ffffff"),
        emissiveIntensity: 7,
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
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="background"
          castShadow
          receiveShadow
          geometry={nodes.background.geometry}
          material={reflectiveBackgroundMaterial}
          position={[0.687, 0.291, 0.646]}
        />
        <group name="eyes" position={[-0.017, 1.5, 0]} scale={[1, 1, 1.106]}>
          <group
            name="eye_left"
            position={[-0.902, 0.082, 0.326]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.657, 0.653, 0.672]}
          >
            <mesh
              name="Circle001"
              castShadow
              receiveShadow
              geometry={nodes.Circle001.geometry}
              material={emissiveMaterial}
              morphTargetDictionary={nodes.Circle001.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle001.morphTargetInfluences}
            />
            <mesh
              name="Circle001_1"
              castShadow
              receiveShadow
              geometry={nodes.Circle001_1.geometry}
              material={materials.gradient}
              morphTargetDictionary={nodes.Circle001_1.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle001_1.morphTargetInfluences}
            />
          </group>
          <group
            name="eye_right"
            position={[0.892, 0.082, 0.308]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[0.657, 0.653, 0.672]}
          >
            <mesh
              name="Circle008"
              castShadow
              receiveShadow
              geometry={nodes.Circle008.geometry}
              material={emissiveMaterial}
              morphTargetDictionary={nodes.Circle008.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008.morphTargetInfluences}
            />
            <mesh
              name="Circle008_1"
              castShadow
              receiveShadow
              geometry={nodes.Circle008_1.geometry}
              material={materials.gradient}
              morphTargetDictionary={nodes.Circle008_1.morphTargetDictionary}
              morphTargetInfluences={nodes.Circle008_1.morphTargetInfluences}
            />
          </group>
        </group>
        <group name="empty_entrace" ref={introPlanes} position={[0, 1.381, 0]}>
          <mesh
            name="Plane"
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={introBars}
            position={[0.02, 0.249, 0.479]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[2.2, 1, 0.01]}
          />
          <mesh
            name="Plane001"
            castShadow
            receiveShadow
            geometry={nodes.Plane001.geometry}
            material={introBars}
            position={[0.02, 0.249, 0.479]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[2.2, 1, 0.01]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/glb/proxie_animations_v4.glb");

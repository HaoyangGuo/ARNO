import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

function SparkLine({ curve, color, speed }) {
  const material = useRef();

  useFrame(() => {
    material.current.uniforms.dashOffset.value -= speed;
  });

  return (
    <mesh>
      <meshLine attach="geometry" points={curve} />
      <meshLineMaterial
        ref={material}
        transparent
        // depthTest={false}
        lineWidth={0.02}
        color={color}
        dashArray={0.1}
        dashRatio={0.2}
      />
    </mesh>
  );
}

export default function Trails({ count = 1, color, radius = 10, higher }) {
  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, index) => {
        // const pos = new THREE.Vector3(
        //   Math.sin(0) * radius * radiusVariance(),
        //   Math.cos(0) * radius * radiusVariance(),
        //   Math.sin(0) * Math.cos(0) * radius * radiusVariance()
        // );

        let coordinates = [
            [12.2, 0.3, 0],
            [12.2, 0.2, -0.5],
            [12.2, 0, 0],
            [12.2, -0.1, -0.8],
            [12.2, -0.2, -0.7],
            [12.2, -0.3, -0.6],
            [12.3, -0.4, 0],
            [12.3, -0.5, 0.3],
            [12.3, -0.55, 0.35],
            [12.4, -0.6, 0.4],
            [12.4, -0.7, 0.45],
            [12.4, -0.8, 0.4],
            [12.5, -0.85, 0.25],
            [12.5, -0.85, 0.1],
            [12.6, -0.8, 0.05],
            [12.6, -0.7, 0.02],
            [12.7, -0.6, 0.05],
            [13.1, -0.55, 0.3],
            [13.1, -0.6, 0.4],
            [13.2, -0.65, 0.42],
            [13.3, -0.8, 0.4],
            [13.4, -0.85, 0.25],
            [13.5, -0.85, 0.1],
            [13.6, -0.85, 0]
        ];

        coordinates = coordinates.map(([r, theta, phi]) => [r + higher, theta, phi * 1.1]);

        function calculateCordinates(r, theta, phi) {
            const vec = new THREE.Vector3();
            vec.setFromSphericalCoords(r, theta, phi);
            return vec;
        }

        const points = coordinates.map((coordinate) => {
            return calculateCordinates(coordinate[0], coordinate[1], coordinate[2]);
        })

        // const points = new Array(30).fill().map((_, index) => {
        //   const angle = (index / 20) * Math.PI * 2;

        //   return pos
        //     .add(
        //       new THREE.Vector3(
        //         Math.sin(angle) * radius * radiusVariance(),
        //         Math.cos(angle) * radius * radiusVariance(),
        //         Math.sin(angle) * Math.cos(angle) * radius * radiusVariance()
        //       )
        //     )
        //     .clone();
        // });

        // const points = coordinates.map(
        //     (coordinate) => (
        //         new THREE.Vector3(coordinate[0], coordinate[1], coordinate[2])
        //     )
        // );

        const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);
        return {
          color: color,
          speed: 0.002,
          curve,
        };
      }),
    [count, color, radius]
  );

  return (
    <group scale={[1, 1, 1]}>
      {lines.map((props, index) => (
        <SparkLine key={index} {...props} />
      ))}
    </group>
  );
}
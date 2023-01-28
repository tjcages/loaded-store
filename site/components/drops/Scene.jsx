import { useState, useTransition, useRef } from 'react'
// import { useControls } from 'leva'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {
  AccumulativeShadows,
  RandomizedLight,
  RoundedBox,
  Sparkles,
  Environment,
  SoftShadows,
  OrbitControls,
  CameraShake,
  QuadraticBezierLine,
} from '@react-three/drei'
import * as THREE from 'three'

export default function App({
  scale = Array.from({ length: 50 }, () => 0.5 + Math.random() * 4),
}) {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5.5], fov: 50 }}>
      <SoftShadows near={1} />
      <fog attach="fog" args={['white', 0, 40]} />
      <Sparkles
        count={scale.length}
        size={scale}
        position={[0, 0.9, 0]}
        scale={[4, 1.5, 4]}
        speed={0.3}
      />
      <group position={[0, -0.65, 0]}>
        <Sphere />
        <AccumulativeShadows
          temporal
          frames={200}
          color="purple"
          colorBlend={0.5}
          opacity={1}
          scale={10}
          alphaTest={0.85}
        >
          <RandomizedLight
            amount={8}
            radius={5}
            ambient={0.5}
            position={[5, 3, 2]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>
      <Env />
      <Rig />
      <OrbitControls
        // autoRotate
        // autoRotateSpeed={1}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </Canvas>
  )
}

function Cable({
  start,
  end,
  v1 = new THREE.Vector3(),
  v2 = new THREE.Vector3(),
}) {
  const ref = useRef()
  useFrame(
    () =>
      ref.current.setPoints(
        [start.current.getWorldPosition(v2).x, 1.6, -0.1],
        [end.current.getWorldPosition(v2).x, 1.6, -0.1],
        [0, 2.5, -0.1]
      ),
    []
  )
  return <QuadraticBezierLine ref={ref} lineWidth={3} color="#000" />
}

function Rig() {
  const [vec] = useState(() => new THREE.Vector3())
  const { camera, mouse } = useThree()
  useFrame(() => camera.position.lerp(vec.set(mouse.x / 2, 1, 5.5), 0.05))
  return (
    <CameraShake
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0.01}
      yawFrequency={0.5}
      pitchFrequency={0.5}
      rollFrequency={0.4}
    />
  )
}

function Sphere() {
  const [logoMap, closedMap] = useLoader(TextureLoader, [
    '/icon-192x192.png',
    '/CLOSED.jpg',
  ])

  const ref = useRef()
  const logo = useRef()
  const leftCorner = useRef()
  const rightCorner = useRef()

  const [vec] = useState(() => new THREE.Vector3())
  const { camera, mouse } = useThree()
  useFrame(() => {
    ref.current.rotation.z = mouse.x / 6
  })
  // useFrame(
  //   (state) =>
  //     (ref.current.rotation.y =
  //       -Math.sin(state.clock.getElapsedTime() / 32) * 2 * Math.PI)
  // )

  return (
    <group>
      <mesh ref={logo} castShadow position={[0, 2.5, 0]}>
        <circleGeometry args={[0.5, 64]} />
        <meshStandardMaterial metalness={1} roughness={1} map={logoMap} />
      </mesh>
      <group ref={ref} rotation={[0, 0, 0.075 * Math.PI]}>
        <mesh castShadow position={[0.25, 1.3, 0.1]}>
          <boxGeometry args={[2.4, 1.6, 0.01]} />
          <meshStandardMaterial metalness={1} roughness={1} map={closedMap} />
        </mesh>
        <mesh ref={leftCorner} position={[-0.8, 1.95, 0.11]}>
          <circleGeometry args={[0.02, 12]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh ref={rightCorner} position={[1.3, 1.95, 0.11]}>
          <circleGeometry args={[0.02, 12]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
      {/* <Cable start={leftCorner} end={rightCorner} /> */}
    </group>
  )
}

function Env() {
  const [preset, setPreset] = useState('apartment')
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition()
  // const { blur } = useControls({
  //   blur: { value: 0.65, min: 0, max: 1 },
  //   preset: {
  //     value: preset,
  //     options: [
  //       'sunset',
  //       'dawn',
  //       'night',
  //       'warehouse',
  //       'forest',
  //       'apartment',
  //       'studio',
  //       'city',
  //       'park',
  //       'lobby',
  //     ],
  //     // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
  //     // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
  //     // That way we can hang onto the current environment until the new one has finished loading ...
  //     onChange: (value) => startTransition(() => setPreset(value)),
  //   },
  // })
  return <Environment preset={preset} background blur={0.65} />
}

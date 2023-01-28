import { useState, useTransition, useRef } from 'react'
// import { useControls } from 'leva'
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {
  AccumulativeShadows,
  RandomizedLight,
  RoundedBox,
  Sparkles,
  Center,
  Environment,
  OrbitControls,
  CameraShake,
  QuadraticBezierLine,
  SoftShadows,
} from '@react-three/drei'
import * as THREE from 'three'

import PhoneInput from 'react-phone-number-input/input'

import styles from './drops.module.scss'

export default function App({
  scale = Array.from({ length: 50 }, () => 0.5 + Math.random() * 4),
}) {
  const [value, setValue] = useState('')

  return (
    <div className={styles.main}>
      <Canvas shadows camera={{ position: [0, 0, 5.5], fov: 50 }}>
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
        <SoftShadows near={5.5} />
        <fog attach="fog" args={['white', 0, 40]} />
        <ambientLight intensity={0.1} />
        <DirectionalLight />
        <pointLight position={[2, 0, -20]} color="white" intensity={1} />
        <pointLight position={[0, -10, 0]} intensity={1} />
        {/* <Env /> */}
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
      <div className={styles.capture}>
        <PhoneInput
          className={styles.input}
          placeholder="Enter phone number"
          country="US"
          value={value}
          onChange={(value) => (value ? setValue(value) : setValue(''))}
        />
        <button className={styles.button}>Notify Me</button>
      </div>
      <div className={styles.footer}>
        <h1 className={styles.h1}>LOADED</h1>
      </div>
    </div>
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
  useFrame(() => camera.position.lerp(vec.set(mouse.x / 2, 15, 3.5), 0.05))
  return (
    <CameraShake
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0.01}
      yawFrequency={0.5}
      pitchFrequency={0.5}
      rollFrequency={0.4}
      decay={true}
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

function DirectionalLight() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.z = Math.sin(state.clock.getElapsedTime() / 10) * 20
    ref.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() / 40) * Math.PI
  })
  return (
    <directionalLight
      ref={ref}
      castShadow
      position={[2.5, 8, 5]}
      intensity={1.5}
      shadow-mapSize={1024}
    >
      <orthographicCamera
        attach="shadow-camera"
        args={[-10, 10, -10, 10, 0.1, 50]}
      />
    </directionalLight>
  )
}

function Env() {
  const [preset, setPreset] = useState('studio')
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

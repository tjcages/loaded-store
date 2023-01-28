import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { SoftShadows, OrbitControls } from '@react-three/drei'
import styles from './style.module.scss'

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
function Sphere({ position = [0, 0, 0], ...props }) {
  const ref = useRef()
  const factor = useMemo(() => 0.5 + Math.random(), [])
  useFrame((state) => {
    const t = easeInOutCubic(
      (1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2
    )
    ref.current.position.y = position[1] + t * 4
    ref.current.scale.x = 1 + t * 3
  })
  return (
    <mesh
      ref={ref}
      position={position}
      {...props}
      castShadow
      color="transparent"
      opacity={0}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial transparent={true} opacity={0} />
      {/* <meshLambertMaterial
        color="transparent"
        opacity={0}
        roughness={0}
        metalness={0.1}
      /> */}
    </mesh>
  )
}

function Spheres({ number = 10 }) {
  const ref = useRef()
  const positions = useMemo(
    () =>
      [...new Array(number)].map(() => [
        0 - Math.random() * 10,
        3,
        8 - Math.random() * 5,
      ]),
    []
  )
  useFrame(
    (state) =>
      (ref.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() / 10) * Math.PI)
  )
  return (
    <group ref={ref}>
      {positions.map((pos, index) => (
        <Sphere key={index} position={pos} />
      ))}
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

function Box() {
  const ref = useRef()
  useFrame((state) => {
    // ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() / 10)
    ref.current.rotation.y =
      Math.sin(state.clock.getElapsedTime() / 40) * Math.PI
  })
  return (
    <group ref={ref}>
      <mesh receiveShadow castShadow position={[0, 0.1, 1]}>
        <boxGeometry args={[5, 2, 2.5]} />
        <meshLambertMaterial />
      </mesh>
      <mesh receiveShadow castShadow position={[0, 0, 1]}>
        <boxGeometry args={[4.5, 2, 2]} />
        <meshLambertMaterial />
      </mesh>
    </group>
  )
}

export default function Shader() {
  return (
    <div className={styles.canvas}>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <SoftShadows near={5.5} />
        <fog attach="fog" args={['white', 0, 40]} />
        <ambientLight intensity={0.1} />
        <DirectionalLight />
        <pointLight position={[2, 0, -20]} color="white" intensity={1} />
        <pointLight position={[0, -10, 0]} intensity={1} />
        <group position={[0, 0, 0]}>
          <Box />
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -1, 0]}
            receiveShadow
          >
            <planeGeometry args={[500, 500]} />
            <shadowMaterial transparent opacity={0.6} fog={true} />
          </mesh>
          <Spheres />
        </group>
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

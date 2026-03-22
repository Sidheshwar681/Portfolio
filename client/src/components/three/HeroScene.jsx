import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere, Torus, Icosahedron, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Particle system
const Particles = ({ count = 1500 }) => {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Floating geometric shape
const FloatingShape = ({ position, rotation, color, shape, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  const material = (
    <meshStandardMaterial
      color={color}
      wireframe
      transparent
      opacity={0.4}
      emissive={color}
      emissiveIntensity={0.3}
    />
  );

  return (
    <Float speed={speed + 0.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        {shape === 'torus' && <torusGeometry args={[0.8, 0.25, 12, 40]} />}
        {shape === 'ico' && <icosahedronGeometry args={[0.7, 0]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.6, 16, 16]} />}
        {shape === 'oct' && <octahedronGeometry args={[0.7, 0]} />}
        {shape === 'box' && <boxGeometry args={[0.9, 0.9, 0.9]} />}
        {material}
      </mesh>
    </Float>
  );
};

// Central glowing orb
const CentralOrb = () => {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Outer glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#0a0f1e"
          emissive="#00d4ff"
          emissiveIntensity={0.15}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>
      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.02, 8, 80]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#050816']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#b44ffd" />
        <pointLight position={[0, 0, 3]} intensity={0.3} color="#00fff5" />

        <Particles />

        <CentralOrb />

        <FloatingShape position={[-3.5, 1.5, -1]} rotation={[0.5, 0.3, 0]} color="#00d4ff" shape="torus" speed={0.8} />
        <FloatingShape position={[3.5, -1, -2]} rotation={[0.2, 0.6, 0.1]} color="#b44ffd" shape="ico" speed={1.2} />
        <FloatingShape position={[2.5, 2, -3]} rotation={[0.3, 0.1, 0.4]} color="#00fff5" shape="oct" speed={0.6} />
        <FloatingShape position={[-2.5, -2, -1]} rotation={[0.1, 0.4, 0.2]} color="#ff2d78" shape="box" speed={0.9} />
        <FloatingShape position={[0, 3, -4]} rotation={[0.4, 0.2, 0.3]} color="#b44ffd" shape="sphere" speed={0.7} />

        <Stars radius={80} depth={40} count={4000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene;

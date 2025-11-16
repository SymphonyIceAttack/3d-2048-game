import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface ParticleBurstProps {
  position: [number, number, number];
  count?: number;
  color?: string;
  onComplete?: () => void;
}

export function ParticleBurst({
  position,
  count = 20,
  color = "#ffffff",
  onComplete,
}: ParticleBurstProps) {
  const mesh = useRef<THREE.Points>(null);
  const _particles = useRef(new Float32Array(count * 3));
  const _velocities = useRef(new Float32Array(count * 3));

  const [positions, velocitiesArray] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = position[0] + (Math.random() - 0.5) * 0.2;
      pos[i3 + 1] = position[1] + (Math.random() - 0.5) * 0.2;
      pos[i3 + 2] = position[2] + (Math.random() - 0.5) * 0.2;

      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = Math.random() * 0.05 + 0.02;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return [pos, vel];
  }, [count, position]);

  const opacity = useRef(1);
  const lifetime = useRef(1);

  useFrame((_state, delta) => {
    if (!mesh.current) return;

    const pos = mesh.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += velocitiesArray[i3] * delta * 60;
      pos[i3 + 1] += velocitiesArray[i3 + 1] * delta * 60;
      pos[i3 + 2] += velocitiesArray[i3 + 2] * delta * 60;

      velocitiesArray[i3 + 1] -= 0.001 * delta * 60;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    opacity.current -= delta * 1.5;
    lifetime.current -= delta;

    if (mesh.current.material instanceof THREE.Material) {
      mesh.current.material.opacity = Math.max(opacity.current, 0);
    }

    if (lifetime.current <= 0 && onComplete) {
      onComplete();
    }
  });

  return (
    <points ref={mesh} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={opacity.current}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface GlowEffectProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  duration?: number;
}

export function GlowEffect({
  position,
  color = "#ffffff",
  size = 1.5,
  duration = 0.5,
}: GlowEffectProps) {
  const mesh = useRef<THREE.Mesh>(null);
  const opacity = useRef(0.8);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    const elapsed = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(elapsed * 8) * 0.1;

    mesh.current.scale.setScalar(scale);
    opacity.current -= delta / duration;

    if (mesh.current.material instanceof THREE.Material) {
      mesh.current.material.opacity = Math.max(opacity.current, 0);
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity.current}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

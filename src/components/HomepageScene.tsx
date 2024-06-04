import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '../helpers/ShapeCreator.tsx';
import { MouseEvent, useRef, useState } from 'react';
import { Object3D, Vector3 } from 'three';

export default function HomepageScene() {
	const self = useRef<HTMLDivElement>(null);
	const [mouseLocation, setMouseLocation] = useState<number[]>([0, 0]);

	function calculateMouseLocation(e: MouseEvent) {
		const mouseX = -10 + (20 / (self.current?.offsetWidth ?? window.innerWidth)) * e.clientX;
		const mouseY = (-10 + (20 / (self.current?.offsetHeight ?? 11)) * e.clientY) * -1;
		setMouseLocation([mouseX, mouseY]);
	}

	return (
		<div ref={self} className="h-screen w-full" onMouseMove={calculateMouseLocation}>
			<Canvas>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight position={[69, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
				<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
				<Eye mouseX={mouseLocation[0]} mouseY={mouseLocation[1]} location={[-1.2, 0, -1]} />
				<Eye mouseX={mouseLocation[0]} mouseY={mouseLocation[1]} location={[1.2, 0, -1]} />
			</Canvas>
		</div>
	);
}

const Eye = (props: { mouseX: number; mouseY: number; location: [x: number, y: number, z: number] }) => {
	const sphereRef = useRef<Object3D>(null);
	const lerpRef = useRef<Object3D>(null);

	useFrame(() => {
		if (!sphereRef.current || !lerpRef.current) return;
		lerpRef.current.lookAt(new Vector3(props.mouseX, props.mouseY, 5));
		sphereRef.current.quaternion.slerpQuaternions(sphereRef.current.quaternion, lerpRef.current.quaternion, 0.05);
		sphereRef.current.position.set(...props.location);
	});

	return (
		<>
			<object3D ref={lerpRef} />
			<object3D ref={sphereRef}>
				<Sphere texture={'../assets/Eye_4096.png'} />
			</object3D>
		</>
	);
};

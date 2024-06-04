import { MeshProps, useLoader } from '@react-three/fiber';
import { RepeatWrapping, TextureLoader } from 'three';

class ShapeProps {
	width?: number = 1;
	length?: number = 1;
	height?: number = 1;
	color?: string = 'orange';
	scale?: number = 1;
	texture?: string = '../assets/Eye_4096.png';
	onClick?: () => void;
	onPointerOver?: () => void;
	onPointerOut?: () => void;
}

export function Box(props: MeshProps & ShapeProps): JSX.Element {
	const texture = useLoader(TextureLoader, props.texture ?? '../assets/Eye_4096.png');
	return (
		<mesh
			{...props}
			scale={props.scale}
			onClick={props.onClick}
			onPointerOver={props.onPointerOver}
			onPointerOut={props.onPointerOut}
		>
			<boxGeometry args={[props.width, props.length, props.height]} />
			{props.texture ? <meshStandardMaterial map={texture} /> : <meshStandardMaterial color={props.color} />}
		</mesh>
	);
}

export function Sphere(props: MeshProps & ShapeProps): JSX.Element {
	const texture = useLoader(TextureLoader, props.texture ?? '../assets/Eye_4096.png');
	texture.wrapT = RepeatWrapping;
	texture.wrapS = RepeatWrapping;
	texture.offset.x = 0.25;
	return (
		<mesh
			{...props}
			scale={props.scale}
			onClick={props.onClick}
			onPointerOver={props.onPointerOver}
			onPointerOut={props.onPointerOut}
		>
			<sphereGeometry args={[props.width, props.length, props.height]} />
			{props.texture ? <meshStandardMaterial map={texture} /> : <meshStandardMaterial color={props.color} />}
		</mesh>
	);
}

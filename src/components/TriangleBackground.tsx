import { CSSProperties, useState } from 'react';

const triangles = [...Array(50).keys()].map((i) => {
	const triangleSize = Math.random() * 100 - 10;

	const style: CSSProperties = {
		left: Math.floor(Math.random() * 115) - 15 + '%', // Generate random number between 0.1 and 0.9
		animationDelay: Math.random() * -30 + 's', // -30 so that the animation starts from first load instead of somewhere between 0 and 30 seconds after
		borderBottomWidth: triangleSize + 'px',
		borderLeftWidth: (triangleSize / 3) * 2 + 'px',
		borderRightWidth: (triangleSize / 3) * 2 + 'px',
	};

	return <ul key={i} className="triangle triangle-background animate-triangle opacity-0" style={style} />;
});

export default function TriangleBackground() {
	const [range, setRange] = useState<number[]>([...Array(50).keys()]);

	window.onresize = () => {
		setRange([...Array(50).keys()]);
	};

	return (
		<div className="absolute -z-20 w-screen h-screen overflow-hidden eye-scene-background top-0">
			{range.map((i) => {
				return triangles[i];
			})}
		</div>
	);
}

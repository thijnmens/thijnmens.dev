import { CSSProperties, useState } from 'react';

const circles = [...Array(50).keys()].map((i) => {
	const circleRadius = Math.random() * 100 - 10;

	const style: CSSProperties = {
		bottom: `${Math.floor(Math.random() * 115) - 15}%`, // Generate random number between 0.1 and 0.9
		animationDelay: `${Math.random() * -30}s`, // -30 so that the animation starts from first load instead of somewhere between 0 and 30 seconds after
		width: `${circleRadius}px`,
		height: `${circleRadius}px`,
	};

	return <ul key={i} className="circle animate-horizontal" style={style} />;
});

export default function CircleBackground() {
	const [range, setRange] = useState<number[]>([...Array(50).keys()]);

	window.onresize = () => {
		setRange([...Array(50).keys()]);
	};

	return (
		<div className="absolute -z-20 w-screen h-screen overflow-hidden gradient-yellow-orange top-0">
			{range.map((i) => {
				return circles[i];
			})}
		</div>
	);
}

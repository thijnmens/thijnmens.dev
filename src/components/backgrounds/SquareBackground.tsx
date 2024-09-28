import { CSSProperties, useState } from 'react';

const squares = [...Array(50).keys()].map((i) => {
	const squareSize = Math.random() * 100 - 10;

	const style: CSSProperties = {
		bottom: `${Math.floor(Math.random() * 115) - 15}%`, // Generate random number between 0.1 and 0.9
		animationDelay: `${Math.random() * -60}s`, // -30 so that the animation starts from first load instead of somewhere between 0 and 30 seconds after
		width: `${squareSize}px`,
		height: `${squareSize}px`
	};

	return <ul key={i} className="square animate-horizontal-spin" style={style} />;
});

export default function SquareBackground() {
	const [range, setRange] = useState<number[]>([...Array(50).keys()]);

	window.onresize = () => {
		setRange([...Array(50).keys()]);
	};

	return (
		<div className="absolute -z-20 w-screen h-screen overflow-hidden bg-black top-0">
			{range.map((i) => {
				return squares[i];
			})}
		</div>
	);
}

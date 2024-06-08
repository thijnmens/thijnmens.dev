import EyeScene from './components/EyeScene.tsx';
import { CSSProperties } from 'react';

export default function App() {
	return (
		<>
			<div className="absolute w-screen h-screen overflow-hidden">
				{[...Array(20).keys()].map(() => {
					const rand = Math.random();

					const style: CSSProperties = {
						left: Math.floor(Math.random() * 90) + 10 + '%', // Generate random number between 0.1 and 0.9
						animationDelay: Math.random() * -30 + 's', // -30 so that the animation starts from first load instead of somewhere between 0 and 30 seconds after
					};

					if (rand <= 0.2)
						return (
							<li className="triangle-lg triangle-background animate-triangle opacity-0" style={style} />
						);
					if (rand <= 0.8)
						return (
							<li className="triangle-sm triangle-background animate-triangle opacity-0" style={style} />
						);
					return <li className="triangle-md triangle-background animate-triangle opacity-0" style={style} />;
				})}
			</div>
			<EyeScene />
		</>
	);
}

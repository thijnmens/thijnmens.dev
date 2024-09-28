import SquareBackground from '../components/backgrounds/SquareBackground.tsx';
import { PropsWithChildren } from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaDownload, FaGlobeAmericas } from "react-icons/fa";
import Tag from '../types/Tag.ts';
import Layout from '../types/Layout.ts';


export default function Layouts() {

	const layouts = [
		{
			name: "Externion",
			description: "Example overlay, can be used to develop your own",
			tags: [Tag.Example],
			image: "https://raw.githubusercontent.com/thijnmens/AdofaiWeb/refs/heads/master/Examples/Externion/Pictures/ExternionExample.png",
			source: "https://github.com/thijnmens/AdofaiWeb/tree/master/Examples/Externion",
			download: "https://raw.githubusercontent.com/thijnmens/AdofaiWeb/refs/heads/master/Examples/Externion/Externion.html"
		}
	]

	return (
		<>
			<SquareBackground />
			<div className="flex flex-col px-20 py-8 gap-4 overflow-y-scroll h-bottom absolute left-0 top-32 w-full -z-10">
				<Section
					title="Adofai Websocket Layouts"
				>
					<p>Repository for layouts that can be used with the Adofai Websocket Mod, found <a href="https://github.com/thijnmens/adofaiweb">here</a></p>
				</Section>
				<Section
					title="Search"
				>
					<div className="flex gap-3 my-2">
						<input className="p-2 rounded-lg bg-gray-500 bg-opacity-50 font-bold w-1/2" />
						<button onClick={() => alert("Not yet implemented")}>
							<FaMagnifyingGlass className='h-full w-fit rounded-lg bg-gray-500 bg-opacity-50 p-2 ' />
						</button>
					</div>
				</Section>
				<div className='grid grid-cols-3 grid-flow-row gap-4 w-full'>
					{layouts.map((layout, i) => {
						return <Item key={i} {...layout} />
					})}
				</div>
			</div>
		</>
	);
}

const Section = (props: PropsWithChildren<{ title: string; }>) => {
	return (
		<section className="flex items-center justify-start w-full rounded-lg p-6 shadow-md relative">
			<span className="bg-gray-200 bg-opacity-20 absolute left-0 w-full h-full backdrop-blur-lg rounded-lg" />
			<div className="flex flex-col h-full justify-around blur-0 w-full">
				<h1 className="text-3xl font-bold">{props.title}</h1>
				{props.children}
			</div>
		</section>
	);
};

const Item = (props: Layout) => {
	return (
		<section className="flex items-center justify-start w-full rounded-lg p-6 shadow-md relative">
			<span className="bg-gray-200 bg-opacity-20 absolute left-0 w-full h-full backdrop-blur-lg rounded-lg" />
			<div className="w-48 h-48 mr-6 blur-0">
				<img src={props.image} alt="Project Image" className="rounded-lg object-cover h-full" />
			</div>
			<div className="flex flex-col h-full justify-around blur-0">
				<h1 className="text-3xl font-bold">{props.name}</h1>
				<p>{props.description}</p>
				<Tags tags={props.tags} />
			</div>
			<div className="absolute right-4 bottom-4 blur-0">
				<a href={props.source} target="_blank" className='m-4'>
					<FaGlobeAmericas className="h-8 w-8" />
				</a>
				<a href={props.download} target="_blank">
					<FaDownload className="h-8 w-8" />
				</a>
			</div>
		</section>
	)
}

const Tags = (props: { tags: Tag[] }) => {
	return (
		<div className="flex -ml-2">
			{props.tags.map((tag) => {
				return <p className="px-2 py-1 rounded-lg bg-white bg-opacity-25 mx-1 font-thin">{tag}</p>;
			})}
		</div>
	);
};
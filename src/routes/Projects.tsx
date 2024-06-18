import CircleBackground from '../components/backgrounds/CircleBackground.tsx';
import Tag from '../types/Tag.ts';

export default function Projects() {
	return (
		<>
			<CircleBackground />
			<div className="flex flex-col px-20 py-8 gap-4 overflow-y-scroll h-bottom absolute left-0 top-32 w-full -z-10">
				<Section
					title="Trackmania Driving AI"
					description="A self driving reinforcement learning AI to make the creation of TAS runs easier"
					tags={[Tag.Python, Tag.AI]}
					image="/assets/TM.webp"
				/>
				<Section
					title="Vessem"
					description="A language learning platform"
					tags={[Tag.Typescript, Tag.Webdev]}
					image="https://avatars.githubusercontent.com/u/158747277?s=200&v=4"
				/>
			</div>
		</>
	);
}

const Section = (props: { title: string; description: string; tags: Tag[]; image: string }) => {
	return (
		<section className="flex items-center justify-start w-full rounded-lg p-6 shadow-md relative text-black">
			<div className="bg-gray-200 bg-opacity-50 absolute left-0 w-full h-full backdrop-blur-2xl rounded-lg"></div>
			<div className="w-48 h-48 mr-6 blur-0">
				<img src={props.image} alt="Project Image" className="rounded-lg object-cover h-full" />
			</div>
			<div className="flex flex-col h-full justify-around blur-0">
				<h1 className="text-3xl font-bold">{props.title}</h1>
				<p>{props.description}</p>
				<Tags tags={props.tags} />
			</div>
		</section>
	);
};

const Tags = (props: { tags: Tag[] }) => {
	return (
		<div className="flex -ml-2">
			{props.tags.map((tag) => {
				return <p className="px-2 py-1 rounded-lg bg-white bg-opacity-25 mx-1 font-thin">{tag}</p>;
			})}
		</div>
	);
};

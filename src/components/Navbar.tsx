import pages from '../main.tsx';
import { TfiAlignJustify } from 'react-icons/tfi';
import { useState } from 'react';
import { redirect } from 'react-router-dom';

export default function Navbar() {
	const [dropdown, setDropdown] = useState<boolean>(false);

	return (
		<>
			<nav
				aria-expanded={dropdown}
				className="md:m-16 md:rounded-lg aria-expanded:rounded-none rounded-b-lg bg-white text-black h-20 left-0 right-0 top-0 flex p-2 shadow-xl z-10"
			>
				<div className="flex">
					<img
						src="https://cdn.thijnmens.dev/logo.png"
						alt="Thijnmens.dev"
						className="rounded-full mx-2 max-w-0 md:max-w-full"
					/>
					<h1 className="my-auto">
						<span className="font-extralight md:text-4xl text-2xl">Thijnmens</span>
						<span className="font-thin">.dev</span>
					</h1>
				</div>

				<div className="w-1 bg-black md:bg-opacity-10 bg-opacity-0 rounded-lg md:mx-4 mx-auto" />
				<button className="md:w-0 md:opacity-0 mx-4" onClick={() => setDropdown(!dropdown)}>
					<TfiAlignJustify />
				</button>

				<div className="flex md:w-full md:opacity-100 opacity-0 w-0">
					{pages().map((page) => {
						return <NavButton key={page.id} name={page.id ?? 'Button'} to={page.path ?? '/'} />;
					})}
				</div>

				<div className="justify-end flex md:w-fit md:opacity-100 opacity-0 w-0">
					<span className="w-10 my-auto rounded-full cursor-default">
						<a href={'https://github.com/thijnmens/thijnmens.dev'}>
							<img src="https://github.com/fluidicon.png" alt="Github" className="cursor-pointer" />
						</a>
					</span>
				</div>
			</nav>
			<div className="flex flex-col text-black">
				<hr aria-expanded={!dropdown} className="aria-expanded:opacity-0" />
				{dropdown ? (
					<div aria-expanded={dropdown} className="bg-white p-2 aria-expanded:rounded-b-lg">
						{pages().map((page) => {
							return (
								<NavButton
									key={page.id}
									name={page.id ?? 'Button'}
									to={page.path ?? '/'}
									className="w-full"
								/>
							);
						})}
					</div>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

function NavButton(props: Readonly<{ name: string; to: string; className?: string }>) {
	return (
		<span
			className={`rounded-lg bg-black bg-opacity-0 hover:bg-opacity-5 px-4 py-1 animate-smooth duration-100 content-center ${props.className ?? ''}`}
		>
			<button onClick={() => redirect(props.to)}>
				<p>{props.name}</p>
			</button>
		</span>
	);
}

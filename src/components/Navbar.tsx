import pages from '../main.tsx';

const redirect = (url: string) => {
	if (url.toLowerCase().startsWith("http")) window.location.href = url
	else window.location.pathname = url;
};

export default function Navbar() {

	return (
		<nav className="m-16 rounded-lg bg-white text-black h-20 left-0 right-0 top-0 flex p-2 shadow-xl z-10">
			<div className="flex">
				<img src="https://cdn.thijnmens.dev/logo.png" alt="Thijnmens.dev" className="rounded-full mx-2" />
				<h1 className="my-auto">
					<span className="font-extralight text-4xl">Thijnmens</span>
					<span className="font-thin">.dev</span>
				</h1>
			</div>

			<div className="group flex hover:w-16 w-1 hover:bg-pink-950 bg-black hover:bg-opacity-30 bg-opacity-10 rounded-lg mx-4 animate-smooth duration-1000 delay-1000">
				<button className="group-hover:opacity-100 opacity-0 mx-2 my-auto animate-smooth duration-1000 delay-1000 text-white italic font-extrabold">
					Enter
				</button>
			</div>

			<div className="flex w-full">
				{pages().map((page, i) => {
					return <NavButton key={i} name={page.id ?? 'Button'} to={page.path ?? "/"} />;
				})}
			</div>

			<div className="justify-end flex">
				<button className="w-10 rounded-full cursor-default">
					<img
						src="https://github.com/fluidicon.png"
						alt="Github"
						className="cursor-pointer"
						onClick={() => redirect('https://github.com/thijnmens/thijnmens.dev')}
					/>
				</button>
			</div>
		</nav>
	);
}

function NavButton(props: { name: string, to: string, className?: string }) {
	return (
		<button
			className={`rounded-lg bg-black bg-opacity-0 hover:bg-opacity-5 px-4 py-1 animate-smooth duration-100 ${props.className ?? ''}`}
			onClick={() => redirect(props.to)}
		>
			<p>{props.name}</p>
		</button>
	);
}

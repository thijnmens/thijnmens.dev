import { ErrorResponse, useRouteError } from 'react-router-dom';
import { PiExclamationMarkFill } from 'react-icons/pi';

export default function ErrorPage() {
	const error = useRouteError() as ErrorResponse & { message: string };
	console.error(error);

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<PiExclamationMarkFill className="w-1/12 h-full fill-red-500" />
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<span className="flex flex-col items-center justify-center m-16">
				<i className="font-bold">{error.statusText || error.message}</i>
				<i>{error.data}</i>
			</span>
		</div>
	);
}

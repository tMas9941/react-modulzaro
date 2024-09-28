import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Result() {
	const [searcParams, setSearchParams] = useSearchParams();
	const result = searcParams.get("percent");
	let message = "";
	let theme;
	if (result < 40) {
		theme = "danger";
		message = "You can do better!";
	} else if (result < 70) {
		theme = "warning";
		message = "Not bad!";
	} else {
		theme = "success";
		message = "Congratulation";
	}
	return (
		<div className=" m-4 pb-5 w-90 d-flex flex-column justify-content-center gap-4 border border-secondary rounded">
			<h2 className="border-bottom bg-secondary-subtle p-3 rounded-top">Quiz completed</h2>

			<div className={`d-flex flex-column align-items-center gap-3 `}>
				<h4 className={`p-2 ps-4 pe-4 rounded-5 bg-${theme} text-light`}>{message}</h4>
				<h4>Your final scrore:</h4>
				<h5>{`${result} %`}</h5>
				<Link className={`btn btn-outline-${theme}`} to="/home">
					Restart
				</Link>
			</div>
		</div>
	);
}

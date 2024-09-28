import React from "react";

export default function Progressbar({ progress, category }) {
	const progressPercentage = ((progress.current - 1) / progress.max) * 100;
	return (
		<div className="bg-secondary-subtle p-3 rounded-top">
			<h3>Question category : {category}</h3>
			<div
				className="progress"
				role="progressbar"
				aria-label="Default striped example"
				aria-valuenow="0"
				aria-valuemin="1"
				aria-valuemax="10"
			>
				<div className="progress-bar " style={{ width: `${progressPercentage}%` }}>
					<label>{`${progressPercentage} %`}</label>
				</div>
			</div>
		</div>
	);
}

import React, { useEffect, useState } from "react";

export default function Question({ data, progress, changeProgress }) {
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [shuffledOptions, setShuffledOptions] = useState([]);

	const selectAnswer = (e) => {
		setSelectedAnswer(e.target.id);
	};

	const handleAnswer = () => {
		if (!selectedAnswer) {
			alert("Select an answer!");
			return;
		}
		setSelectedAnswer("");
		changeProgress(data.correctAnswer == selectedAnswer);
	};

	useEffect(() => {
		if (data) {
			setShuffledOptions(shuffleArray(data.options));
		}
	}, [data]);

	const shuffleArray = (array) => {
		for (let i = 0; i < array.length; i++) {
			if (Math.floor(Math.random() > 0.4)) {
				//shuffle
				array.push(array[i]);
				array.splice(i, 1);
			}
		}
		return array;
	};

	return progress.current <= progress.max ? (
		<>
			<section className="p-3">
				<h3>Question {progress.current}</h3>
				<label>{data?.question}</label>
				<div className="d-flex flex-column gap-2 p-3">
					{shuffledOptions?.map((answer) => (
						<button
							className={
								answer == selectedAnswer ? "btn btn-primary btn-lg" : "btn btn-outline-primary"
							}
							key={answer}
							id={answer}
							onClick={selectAnswer}
						>
							{answer}
						</button>
					))}
				</div>
			</section>
			<div className=" bg-secondary-subtle d-flex justify-content-between p-4 rounded-bottom">
				<button className="btn btn-primary" onClick={handleAnswer}>
					Next Question
				</button>
				<button className="btn btn-success">Add New Question</button>
			</div>
		</>
	) : (
		<></>
	);
}

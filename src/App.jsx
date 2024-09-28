import { useEffect, useRef, useState } from "react";

// COMPONENTS
import Progressbar from "./Progressbar";
import Question from "./Question";

export default function App() {
	const [allQuestions, setAllQuestions] = useState([]);
	const [progress, setProgress] = useState({ current: 1, max: 10, rightAnswer: 0 });
	const [gameStarted, setGameStarted] = useState(false);

	const [crrentQuestion, setCurrentQuestion] = useState();
	const usedQuestions = useRef([]);

	const getQuestions = async () => {
		const response = await fetch(`http://localhost:5000/questions`, {
			method: "GET",
		});
		const data = await response.json();

		setAllQuestions(data);
	};

	useEffect(() => {
		getQuestions();
	}, []);

	useEffect(() => {
		setCurrentQuestion(getRandomQuestion());
	}, [gameStarted, progress]);

	const getRandomQuestion = () => {
		// tárolja a lekért question -öket és választ újat, ha már volt
		let newQuestion;
		do {
			newQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];

			if (!newQuestion) {
				return;
			}
		} while (usedQuestions.current.includes(newQuestion.id));
		usedQuestions.current.push(newQuestion.id);
		return newQuestion;
	};

	const changeProgress = (isRightAnswer) => {
		let newProgress = structuredClone(progress);
		newProgress.rightAnswer += isRightAnswer ? 1 : 0;

		if (newProgress.current == newProgress.max) {
			let result = (newProgress.rightAnswer / newProgress.current) * 100;
			window.location.href = `/result?percent=${result}`;
		}
		newProgress.current++;
		setProgress(newProgress);
	};

	return (
		<div className=" p-4 w-100 d-flex flex-column justify-content-center gap-4">
			<h2>My Quiz App</h2>
			{gameStarted ? (
				<main className="border border-secondary rounded ">
					<Progressbar progress={progress} category={crrentQuestion?.category} />
					<Question
						getQuestion={getRandomQuestion}
						progress={progress}
						changeProgress={changeProgress}
						data={crrentQuestion}
					/>
				</main>
			) : (
				<button className="btn btn-primary self-align-center" onClick={() => setGameStarted(true)}>
					Start Quiz!
				</button>
			)}
		</div>
	);
}

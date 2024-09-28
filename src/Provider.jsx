import React, { createContext, useState } from "react";

export const ProgressContext = createContext({ current: 1, max: 10, rightAnswer: 0 });

export default function Provider({ children }) {
	const [progress, setProgress] = useState({ current: 1, max: 10, rightAnswer: 0 });
	// console.log("provider : ", forecast);

	return (
		<>
			<ProgressContext.Provider value={{ progress }}>{children}</ProgressContext.Provider>
		</>
	);
}

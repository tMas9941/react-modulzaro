import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

// PROVIDER
import Provider from "./Provider.jsx";
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
// COMPONENTS
import App from "./App.jsx";
import Result from "./Result.jsx";

const router = createBrowserRouter([
	{ path: "/", element: <Navigate to="/home" /> },
	{ path: "/home", element: <App /> },
	{ path: "/result", element: <Result /> },
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);

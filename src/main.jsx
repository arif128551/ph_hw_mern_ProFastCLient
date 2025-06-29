import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/MainRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

AOS.init();

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
				<Toaster position="top-right" />
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);

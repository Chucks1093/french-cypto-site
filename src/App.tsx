import "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/landing-page/Home/Home";
import SignUp from "./pages/auth/SignUp/SignUp";
import LogIn from "./pages/auth/Login/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./App.css";
import TradingBot from "./pages/dashboard/TradingBot";
import DepositPage from "./pages/dashboard/DepositPage";
import HistoryPage from "./pages/dashboard/HistoryPage";
import WithdrawPage from "./pages/dashboard/WithdrawPage";
// import OnchainProviders from "./providers/OnchainProviders";
import { MoralisProvider } from "react-moralis";
import { useEffect } from "react";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/signin",
		element: <LogIn />,
	},
	{
		path: "/dashboard",
		element: <DashboardLayout />,
		children: [
			{
				index: true,
				element: <Overview />,
			},
			{
				path: "trading-bot",
				element: <TradingBot />,
			},
			{
				path: "deposit",
				element: <DepositPage />,
			},
			{
				path: "history",
				element: <HistoryPage />,
			},
			{
				path: "withdraw",
				element: <WithdrawPage />,
			},
		],
	},
]);

function App() {
	useEffect(() => {
		const userLanguage = navigator.language;
		console.log(userLanguage)
		if (!userLanguage.startsWith('french')) {
			const htmlpage = document.querySelector("html")!;
			console.log(htmlpage)
			htmlpage!.lang = "french"
		}
	 }, []);
	return (
		<div className="">
			<MoralisProvider initializeOnMount={false}>
				<Toaster />
				<RouterProvider router={router} />

			</MoralisProvider>
			{/* <OnchainProviders> */}
			{/* </OnchainProviders> */}
		</div>
	);
}

export default App;

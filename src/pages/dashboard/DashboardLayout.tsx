import Sidebar from "@/components/dashboard/side-bar/Sidebar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import TopNav from "@/components/dashboard/top-nav/TopNav";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import showToast from "@/utils/showToast";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loader from "@/components/loader/linear-loader/Loader";

function DashboardLayout() {
	const token = Cookies.get("french-token");
	const [isLoading, setIsLoading] = useState(false);

	//   const isAuthenticated = token !== undefined;
	const isAuthenticated = true;
	const navigate = useNavigate();
	const { setCurrentUser, currentUser } = useCurrentUser();

	const getCurrentUserInfo = async () => {
		try {
			setIsLoading(true);
			const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/user`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await resp.json();
			if (!resp.ok) {
				setIsLoading(false);
				navigate("/login");
				return showToast.error(result.message);
			}
			setCurrentUser(result.data);
			navigate("/dashboard");
		} catch (error) {
			if (error instanceof Error) {
				showToast.error(error.message);
				console.log(error);
				navigate("/login");
			}
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (isAuthenticated && !currentUser) {
			getCurrentUserInfo();
		}
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	if (isAuthenticated && currentUser) {
		return (
			<div className="dashboard__layout">
				<TopNav />
				<Sidebar />
				<div className="outlet">
					<Outlet />
				</div>
			</div>
		);
	}
	if (!isAuthenticated && !currentUser) {
		return <Navigate to="/signin" />;
	}
}

export default DashboardLayout;

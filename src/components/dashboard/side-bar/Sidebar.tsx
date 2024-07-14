import SidebarItem, { SideItemProps } from "./SidebarItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";
import showToast from "@/utils/showToast";
import Cookies from "js-cookie";

const sideBarData: Omit<SideItemProps, "handleClick">[] = [
	{
		link: "/dashboard",
		icon: "/icons/dashboard.svg",
		title: "Overview",
	},
	{
		link: "/dashboard/trading-bot",
		icon: "/icons/bot.svg",
		title: "Trading Bot",
	},
	{
		link: "/dashboard/deposit",
		icon: "/icons/deposit.svg",
		title: "Deposit",
	},
	{
		link: "/dashboard/withdraw",
		icon: "/icons/withdraw.svg",
		title: "Withdraw",
	},
	{
		link: "/dashboard/history",
		icon: "/icons/trade.svg",
		title: "History",
	},
];

function Sidebar() {
	const {setSideBar, sideBar} = useCurrentUser();
	// const currentUser = useCurrentUser((state) => state.currentUser);
	// const sideBarState = useCurrentUser((state) => state.sideBar);
	const navigate = useNavigate();

	// const { sideBar } = useCurrentUser();

	const handleNavLinkClick = () => {
		setSideBar(false);
	};
	const handleLogOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		Cookies.remove("doctor-token");
		showToast.success("Signed Out");
		navigate("/signin", { replace: true });
	};

	return (
		<aside className={`bg-app-primary  flex flex-col justify-between px-6 ${sideBar && "show__aside"}`}>
			<div className="flex gap-2 items-center mt-4">
				<img className="w-12" src="/images/logo.png" alt="" />
				<p className="text-white font-semibold">FrenchCypto</p>
			</div>
			<div className="mb-auto mt-8">
				<p className="text-sm text-gray-400 uppercase font-semibold mb-4">Manage</p>
				{sideBarData.map((item, index) => (
					<SidebarItem
						key={index}
						link={item.link}
						icon={item.icon}
						title={item.title}
						handleClick={handleNavLinkClick}
					/>
				))}
			</div>
				<div>
				<p className="text-sm text-gray-400 uppercase font-semibold mb-2">Prefrences</p>
					<SidebarItem
						link="/dashboard/settings"
						icon="/icons/settings.svg"
						title="Settings"
						handleClick={handleNavLinkClick}
					/>
					<SidebarItem
						link="/signin"
						icon="/icons/logout.svg"
						title="Log out"
						handleClick={handleLogOut}
					/>
				</div>
		</aside>
	);
}
export default Sidebar;

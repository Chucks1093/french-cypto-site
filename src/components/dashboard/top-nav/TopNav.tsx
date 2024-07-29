import useCurrentUser from "@/hooks/useCurrentUser";
import { useLocation } from "react-router-dom";

const navHeading = {
	"/dashboard": "Overview",
	"/dashboard/trading-bot": "Trading Bot",
	"/dashboard/deposit": "Deposit",
	"/dashboard/withdraw": "Withdraw",
	"/dashboard/history": "History",
};

function TopNav() {
	const { pathname } = useLocation();
	const {setSideBar, sideBar} = useCurrentUser()
	
	return (
		<nav className="  flex justify-between items-center px-8 w-full shadow-2xl">
			<p className="font-bold">{navHeading[pathname as keyof typeof navHeading]}</p>
			<div className="flex justify-center items-centerm gap-5">
				{/* <div className="bg-gray-200 rounded-2xl flex w-[14rem] h-8 px-4 gap-2 md:block hidden">
					<img className="w-4" src="/icons/search.svg" alt="" />
					<input
						placeholder="Search..."
						type="text"
						className="w-full block bg-transparent placeholder:text-sm inset-4"
					/>
				</div> */}
				<span
					className="flex items-center justify-center bg-gray-200 p-1 rounded-full overflow-hidden'
				"
				>
					<img className="w-full" src="/icons/notification.svg" alt="" />
				</span>
				<span
					className="flex items-center justify-center bg-gray-200 p-1 rounded-full overflow-hidden
				"
				>
					<img className="w-full" src="/icons/message.svg" alt="" />
				</span>
				<span className="w-8 h-8 rounded-full overflow-hidden">
					<img className="w-8" src="/images/no-profile.jpg" alt="" />
				</span>
				<button className="flex items-center justify-center bg-gray-200 p-1 rounded-full overflow-hidden
				" onClick={()=>setSideBar(!sideBar)} >
					<img className="w-6 invert-[.5]" src={!sideBar? "/icons/menu.svg" : "/icons/cancel.svg"}alt="" />
				</button>

			</div>
		</nav>
	);
}
export default TopNav;

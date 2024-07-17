import { Link } from "react-router-dom";
import NavButton from "./NavButton";
import { useState } from "react";
import NavMobileView from "./NavMobileView";
function Navbar() {
	const [visible, setVisible] = useState(false);

	const handleToggle = () => {
		setVisible(!visible);
	};

	return (
		<nav className=" text-white w-full bg-[#0f1426] flex flex-col px-4 lg:px-10 md:px-5 py-5  sticky top-0 mx-auto z-50">
			<div className="  flex flex-row justify-between  max-w-[1240px] ">
				<Link to={"/"}>
					<img src="/icons/Logo.svg" alt="logo " />
				</Link>

				<div>
					<ul className=" md:flex hidden md:flex-row lg:gap-7 gap-3 font-[500] text-[14px] justify-center items-center">
						<li>
							<Link to={"/"}>Home</Link>
						</li>
						<li>
							<Link to={"/#"}>About</Link>
						</li>
						<li>
							<Link to={"/#"}>Contact</Link>
						</li>
						<li>
							<NavButton />
						</li>
					</ul>
				</div>
				<button className="flex items-center justify-center bg-app-primary p-1 rounded-full overflow-hidden border border-gray-800 
				md:hidden" onClick={handleToggle} >
					<img className="w-6 invert-[.5]" src={!visible? "/icons/menu.svg" : "/icons/cancel.svg"}alt="" />
				</button>
			</div>
			<NavMobileView visible={visible} />
		</nav>
	);
}

export default Navbar;

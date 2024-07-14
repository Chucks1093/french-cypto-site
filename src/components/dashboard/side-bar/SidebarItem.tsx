import { NavLink, useLocation } from 'react-router-dom';
import "./style.css";

export type SideItemProps = {
   icon: string;
   title: string;
   link: string;
   handleClick: (e: React.MouseEvent<HTMLAnchorElement>)=> void
}

const SidebarItem = ({ icon, title, link, handleClick }: SideItemProps) => {
	const location = useLocation();
	console.log(location.pathname, link)


	return (
		<NavLink onClick={handleClick} className={`${location.pathname == link && "active__link"} sidebar__item py-3 rounded-xl flex gap-2 items-center px-4 mb-2`} to={link}>
			<img className='w-5' src={icon} alt="" />
			<h2 className="text-sm">{title}</h2>
		</NavLink>
	);
};

export default SidebarItem;
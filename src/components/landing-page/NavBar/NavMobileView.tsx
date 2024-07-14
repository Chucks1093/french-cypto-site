import { Link } from "react-router-dom";

export default function NavMobileView({ visible }: any) {
  if (visible) {
    return (
      <div className="text-center w-full ">
        <ul className=" flex md:hidden  flex-col lg:gap-7 gap-3 ">
          <li>
            <Link to="/" className={` `}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/#" className={``}>
              About us
            </Link>
          </li>
          <li>
            <Link to="/#" className={``}>
              Contact
            </Link>
          </li>

          <li>
            <div className=" flex flex-col gap-3">
              <div className=" border-white border-2 rounded-full text-white font-[500] text-center px-[20px] lg:px-[24px] py-1">
                <Link to="/signin">Sign in</Link>
              </div>
              <div
                className={` bg-[#19213D]  text-white rounded-full font-[500] text-center px-[20px]  lg:px-[24px] py-1 mb-4 `}
              >
                <Link to="/signup" className="">
                  Get started
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

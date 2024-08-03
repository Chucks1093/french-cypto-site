import { Link } from "react-router-dom";

export default function NavMobileView({ visible }: any) {
  if (visible) {
    return (
      <div className="text-center w-full ">
        <ul className=" flex md:hidden  flex-col lg:gap-7 gap-5 my-10 text-sm px-10">
          <li>
            <a href="#home" className={` `}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className={``}>
              About us
            </a>
          </li>
          <li>
            <a href="#testimonial" className={``}>
              Testimonial
            </a>
          </li>

          <li>
            <div className=" flex flex-col gap-3 ">
              <div className=" bg-white text-app-primary rounded-full  font-[500] text-center px-[20px] lg:px-[24px] py-2 my-3">
                <Link to="/signin">Sign in</Link>
              </div>
              <div
                className={` bg-[#19213D]  text-white rounded-full font-[500] text-center px-[20px]  lg:px-[24px] py-2 `}
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

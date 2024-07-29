import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={` h-full sm:p-10 p-5 mb-0`} id="footer">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1240px]  mx-auto">
        <div className=" flex-1 flex-col sm:pe-12 ">
          <div className="flex mt-6">
            <img src="/icons/Logo.svg" alt="" />
          </div>

          <div className=" flex flex-row gap-5 mt-3">
            <Link to='/#'>
              <i className="pi pi-twitter" style={{ fontSize: "1rem" }}></i>
            </Link>
            <Link to='/#'>
              <i className="pi pi-instagram" style={{ fontSize: "1rem" }}></i>
            </Link>
            <Link to='/#'>
              <i className="pi pi-discord" style={{ fontSize: "1rem" }}></i>
            </Link>
            <Link to='/#'>
              <i className="pi pi-youtube" style={{ fontSize: "1rem" }}></i>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="mt-6 text-white text-[26px] font-[500]">Company</h3>
          <ul>
            <li className=" mb-2">
              <Link to="/#" className=" text-white">
                About us
              </Link>
            </li>


            <li className=" mb-2">
              <Link to="/#" className="text-white">
                Contact us
              </Link>
            </li>
          </ul>
        </div>

        <div className=" flex-1">
          <h3 className="mt-6 text-white text-[26px] font-[500]">Resources</h3>
          <ul>
            <li className=" mb-2">
              <Link to="/#" className=" text-white">
                TOS
              </Link>
            </li>

            <li className=" mb-2 ">
              <Link to="/#" className="text-white">
                Privacy Policy
              </Link>
            </li>
            <li className=" mb-2 ">
              <Link to="/#" className="text-white">
                Community
              </Link>
            </li>
            <li className=" mb-2 ">
              <Link to="/#" className="text-white">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex-1 ">
          <h3 className="mt-6 text-white text-[26px] font-[500]">Contact us</h3>
          <div className=" flex flex-row gap-2 mb-2">
            <i className=" pi pi-map-marker mt-2 text-white font-[500]"></i>
            <span className="font-medium text-white">
              4140 Parker Rd. Allentown, New Mexico 31134.
            </span>
          </div>
          <div className=" flex flex-row gap-2 mb-2">
            <i className="pi pi-phone mt-1 text-white font-[500]"></i>
            <span className="font-medium text-white">(208) 555-0112</span>
          </div>
          <div className=" flex flex-row gap-2 mb-2">
            <i className="pi pi-envelope mt-1 text-white font-[500]"></i>
            <span className="font-medium text-white">
              info@frenchcrypto.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

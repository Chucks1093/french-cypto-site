import NavButton from "../NavBar/NavButton";

export default function Hero() {
  return (
    <div className=" flex flex-col items-center pt-10 py-20 space-y-4 relative" id="home">
      <img className="absolute left-0 top-0 w-full" src="/icons/grid.svg" alt="" />
      <img className="absolute left-0 -top-10 w-full" src="/icons/hero-eclipse.svg" alt="" />
      <div
        className={` font-[500] text-white text-[14px] rounded-full text-center  py-1 bg-transparent px-4 mb-12 `}
      >
        <p className="top__text break-all text-gray-400 ">Make more profits, less loss with our AI trading bot</p>
      </div>

      <div className=" text-center flex flex-col items-center space-y-6 z-20">
        <h1 className=" text-[1.7rem] md:text-[4.2rem] font-[400]  text-center  leading-[1.2] hero__text ">
          Unlock Your Financial <br /> Future with AI-Powered <br /> Trading
        </h1>

        <p className=" text-center text-[.8rem] md:text-[17px] text-gray-400">
          Utilize advanced AI to optimize your trading. Analyze trends, <br />execute 
          smart trades, and maximize returns.
        </p>

        <NavButton />
      </div>

      <div className=" pt-8">
        <img src="/icons/Hero-bg.svg" alt=" Hero img" />
      </div>
    </div>
  );
}

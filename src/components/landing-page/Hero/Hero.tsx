import NavButton from "../NavBar/NavButton";

export default function Hero() {
  return (
    <div className=" flex flex-col items-center py-20 space-y-8">
      <div
        className={` font-[500] text-white text-[14px] rounded-full text-center  py-1 bg-[#19213D] px-4 m-2 `}
      >
        <p className=" break-all text-gray-400">Make more profits, less loss with our AI trading bot</p>
      </div>

      <div className=" text-center flex flex-col items-center space-y-6 md:w-1/2 w-5/6">
        <h1 className=" text-[1.5rem] md:text-[2.6rem] font-[400]  text-center text-wrap">
          Unlock Your Financial Future with AI-Powered Trading
        </h1>

        <p className=" text-center text-[17px]">
          Utilize advanced AI to optimize your trading. Analyze trends, execute
          smart trades, and maximize returns.
        </p>

        <NavButton />
      </div>

      <div className=" px-12">
        <img src="/icons/Hero-bg.svg" alt=" Hero img" />
      </div>
    </div>
  );
}

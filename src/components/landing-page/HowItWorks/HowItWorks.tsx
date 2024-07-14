import Intro from "../../../lib/util/Intro";
import WorksCard from "./WorksCard";

export default function HowItWorks() {
  return (
    <div className="max-w-[1140px] mx-auto p-5 ">
      <Intro contentIntro="How It Works" />

      <div className=" flex flex-col items-center mx-auto">
        <h1 className=" md:text-[48px] font-[400] text-[32px] text-center">
          How It Works
        </h1>
        <p className="md:w-1/2 w-5/6 text-center md:text-justify">
          Our user-friendly interface and intuitive features ensure that even
          newcomers can quickly grasp the essentials and embark on a seamless
          journey into the world of efficient and profitable trading.
        </p>
      </div>

      <div className=" flex flex-col md:flex-row justify-between gap-7 p-5 mt-5">
        <div>
          <img src="/icons/works-illustr.svg" alt="" />
        </div>

        <div className=" grid sm:grid-cols-2 gap-5">
          <WorksCard
            CardTitle="Step 1: Sign Up"
            CardBody="Signing up is a breeze - just a few clicks, and you're in."
            Icon="/icons/stepone.svg"
          />
          <WorksCard
            CardTitle="Step 2: Deposit Funds"
            CardBody="Add money to your FrenchCrypto following our user friendly funding system."
            Icon="/icons/DepositFunds.svg"
          />
          <WorksCard
            CardTitle="Step 3: Activate Bot"
            CardBody="Select from our wide range of AI trading bots and activate a portfolio."
            Icon="/icons/ActivateBot.svg"
          />
          <WorksCard
            CardTitle="Step 1: Withdraw"
            CardBody="Withdraw your capital and profits to your external wallet at anytime."
            Icon="/icons/Withdraw.svg"
          />
        </div>
      </div>
    </div>
  );
}

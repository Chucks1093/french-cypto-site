

export interface WhyChooseProps{
  CardTitle: string;
  CardBody: string;
  Icon: string;
}
export default function WhyChooseCard({
  CardBody,
  CardTitle,
  Icon,
}: WhyChooseProps) {
 
  return (
    <div
      className="bg-[#0f0f0f] w-full md:max-w-[330px] flex flex-col items-center align-middle justify-center font-[Inter] md:py-4 py-8  space-y-3 rounded-[7px] px-4 opacity-0 translate-y-[10%]"
      style={{ boxShadow: "0 1px 6px #00000005" }}
    >
      <div>
       <img src={Icon} alt="why img"  className=" text-center"/>
      </div>
      <div>
        <h4 className="font-[400] text-[24px] text-[#ffffff] text-center">{CardTitle}</h4>
      </div>
      <div>
        <p className=" leading-[1.6] font-[400]  text-gray-300 text-center text-[.76rem]">{CardBody}</p>
      </div>
    </div>
  );
}

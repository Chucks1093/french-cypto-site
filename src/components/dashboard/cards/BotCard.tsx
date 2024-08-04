
import { formatCustomDuration } from "@/utils/utils";
import "./style.css";
import { useState } from "react";

type BotCardProps = {
   // amount: number;
   price: number;
   side?: "buy" | "sell";
   symbol: string;
   timestamp: string;
   type?: "limit" | "market"; // Assuming "market" is another possible type
   user_id?: number;
   roi?: number;
   pnl?: number;
   cardType: "market" | "grid"
};

function BotCard(props: BotCardProps) {
   console.log(props.timestamp)
   const [display, setDisplay] = useState(true)
   const time = new Date(Number(props.timestamp) * 1000);
   console.log(time)

   // console.log(props.timestamp)
   const timeValue = formatCustomDuration(time);

   // console.log(timeValue)
   // const timeValue = formatCustomDuration(new Date(props.timestamp))
   return display &&  (
      <article className="bot__card p-5 rounded-xl  bg-white ">
         <span
            onClick={() => setDisplay(false)}
            className="flex justify-center items-center p-1 w-8 h-8 rounded-full bg-gray-300 mb-3 ml-auto"
         >
            <img
               className="w-full invert"
               src="/icons/cancel.svg"
               alt=""
            />
         </span>
         <div className="flex justify-between">
            <div>
               <h2 className="font-semibold text-sm">{props.symbol}</h2>
               <p className="bg-gray-300 text-[0.8rem] py-1 px-2 ">Spot Grid</p>
            </div>
            <h2 className="flex items-center justify-center"><img className="w-5" src="/icons/people.svg" alt="" />{props.user_id}</h2>
         </div>
         <div className="flex justify-between items-center mt-3">
            <div>
               <p className="text-[.7rem]">Type</p>
               <p className={`font-bold uppercase ${props.side === "buy" ? "text-red-500" : "text-green-500"}`}>{props.side}</p>
            </div>
            <img src="/icons/line-chart.svg" alt="" />
         </div>
         <div className="flex justify-between items-center mt-3">
            <div>
               <p>ROI</p>
               <p>{props.roi || 0}%</p>
            </div>
            <div>
               <p className="text-right text-sm">Duration</p>
               <p>{timeValue}</p>
            </div>
         </div>
         <div className="flex justify-between items-center mt-3">
            <div>
               <p className="text-[.7rem]">Price</p>
               <p className="font-semibold">${props.price}</p>
            </div>
            {props.cardType == "market" && <button className="px-8 py-2 rounded-3xl bg-app-primary text-white font-semibold text-sm">Copy</button>}
            {props.cardType == "grid" && <button className="px-8 py-2 rounded-3xl bg-green-600 text-white font-semibold text-sm">Active</button>}
         </div>
      </article>
   )
}
export default BotCard
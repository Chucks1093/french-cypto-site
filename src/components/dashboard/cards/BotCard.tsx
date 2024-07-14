
import "./style.css";

function BotCard() {
  return (
    <article className="bot__card p-5 rounded-xl  bg-white ">
      <div className="flex justify-between">
         <div>
            <h2 className="font-semibold text-sm">BTC/USDT</h2>
            <p className="bg-gray-300 text-[0.8rem] py-1 px-2 ">Spot Grid</p>
         </div>
         <h2 className="flex items-center justify-center"><img className="w-5" src="/icons/people.svg" alt="" />12</h2>
      </div>
      <div className="flex justify-between items-center mt-3">
         <div>
            <p>ROI</p>
            <p>2.89%</p>
         </div>
         <img src="/icons/line-chart.svg" alt="" />
      </div>
      <div className="flex justify-between items-center mt-3">
         <div>
            <p>ROI</p>
            <p>2.89%</p>
         </div>
         <div>
            <p>Duration</p>
            <p>11d 8d 2m</p>
         </div>
      </div>
      <div className="flex justify-between items-center mt-3">
         <div>
            <p>Main Investment</p>
            <p>122.5USDT</p>
         </div>
         <button className="px-8 py-2 rounded-3xl bg-green-600 text-white font-semibold text-sm">Active</button>
      </div>
    </article>
  )
}
export default BotCard
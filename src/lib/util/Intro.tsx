export interface ContentIntroProps {
  contentIntro: string;
}
export default function Intro({ contentIntro }: ContentIntroProps) {
  return (
    <div
      className={` font-[500] text-white text-[14px] rounded-full text-center`}
    >
      <p className=" break-all text-gray-400">{contentIntro}</p>
    </div>
  );
}

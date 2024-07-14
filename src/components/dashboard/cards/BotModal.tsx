import { SetStateAction } from "react";
import { Fragment } from "react/jsx-runtime";

type BotModalProps = {
	setDisplay: React.Dispatch<SetStateAction<boolean>>
}
function BotModal(props:BotModalProps) {
	return (
		<Fragment>
			<div onClick={()=> props.setDisplay(false)} />
			<div className="w-[50%]">
            <h1></h1>
         </div>
		</Fragment>
	);
}
export default BotModal;

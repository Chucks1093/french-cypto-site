import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { formatCustomDuration } from "@/utils/utils";

type CalendarInputProps = {
	handleChange: (value: Date) => void;
};

export function CalendarInput(props: CalendarInputProps) {
	const [date, setDate] = useState<Date>();

	// Function to disable dates
	const disabledDays = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date <= today;
	};

	const handleChange = (value: Date | undefined) => {
		if (value) {
			setDate(value);
			props.handleChange(value);
		}
	};

	return (
		<Popover modal={true}>
			<PopoverTrigger
				className="px-4 border-gray-300 border rounded-xl"
				asChild
			>
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
					{date ? (
						<p className="text-sm text-gray-500">
							{formatCustomDuration(date)}
						</p>
					) : (
						<span>Select duration</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit p-0 z-[100]">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleChange}
					className="bg-white"
					disabled={disabledDays}
				/>
			</PopoverContent>
		</Popover>
	);
}

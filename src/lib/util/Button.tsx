import { Button } from "primereact/button";

interface ButtonProps {
  label: string;
  className: string;
}
export default function Buttons({  label,className }: ButtonProps) {
  return (
    <div className="">
      <Button label={label} className={className} />
    </div>
  );
}

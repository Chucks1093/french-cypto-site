import { Password } from "primereact/password";
import './Password.css'

export interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  placeholder: string;
}

export default function PasswordDemo({
  id,
  onChange,
  value,
  type,
  placeholder,
}: InputProps) {
  return (
    <div className="card flex justify-content-center">
      <Password
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        type={type}
        // toggleMask
      />
    </div>
  );
}

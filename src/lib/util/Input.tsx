import React from "react";

export interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, type,placeholder }) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="
        block border-[#EBEFF6] w-full border-2 rounded-full py-1 px-4 focus:outline-none text-[#4C4C4CCC]"
        placeholder={placeholder}
      />

    </div>
  );
};

export default Input;

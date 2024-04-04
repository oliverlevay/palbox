import { HTMLInputTypeAttribute } from "react";

export default function InputField({
  onChange,
  type,
  placeholder,
  className,
  value,
}: {
  onChange: (text: string) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  value?: string;
}) {
  return (
    <input
      type={type ?? "text"}
      placeholder={placeholder}
      className={`pl-1 text-sm rounded-sm bg-lightBlue h-[20px] text-[rgba(0,0,0,0.8)] ${
        className ?? ""
      }`}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      value={value}
    />
  );
}

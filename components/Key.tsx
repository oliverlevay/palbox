export default function Key({
  children,
  className,
  onClick,
}: {
  children: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`flex justify-center items-center bg-lightBlue rounded-sm w-[22px] h-[22px] ${className}`}
    >
      <p className="text-secondary font-bold">{children}</p>
    </button>
  );
}

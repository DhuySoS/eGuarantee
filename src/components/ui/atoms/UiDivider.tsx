"use client";
export type UiDividerProps = {
  children: React.ReactNode;
  className?: string;
};
const UiDivider = ({ children, className = "" }: UiDividerProps) => {
  return (
    <div className={`w-full relative text-gray-400 text-xs  ${className}`}>
      <hr />
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4!">
        {children}
      </span>
    </div>
  );
};

export default UiDivider;

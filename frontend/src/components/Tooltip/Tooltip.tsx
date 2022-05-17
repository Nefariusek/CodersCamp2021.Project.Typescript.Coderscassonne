interface TooltipProps {
  children: React.ReactNode;
  message: string;
}

const Tooltip = ({ children, message }: TooltipProps) => {
  return (
    <div className="m-10 relative inline-block group">
      {!!message && (
        <span className="absolute bottom-full left-1/2 w-[200px] py-[5px] ml-[-100px] z-10 group-hover:visible group-hover:opacity-100 bg-black text-white text-center invisible opacity-0 transition-opacity">
          {message}
        </span>
      )}
      {children}
    </div>
  );
};

export default Tooltip;

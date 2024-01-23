function BtnSecondary({ children, handleClick, className, isDisabled }) {
  return (
    <button
      className={`text-[1.4rem] text-white bg-success py-[.8rem] px-[1.2rem] border-[2px] border-success  hover:bg-white hover:text-success transition-all duration-[.2] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-500 disabled:text-white ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default BtnSecondary;

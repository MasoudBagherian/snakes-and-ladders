function BtnPrimary({ children, handleClick, className, isDisabled }) {
  return (
    <button
      className={`mb-[2rem] text-[1.4rem] text-white bg-primary-light py-[.8rem] px-[1.2rem] border-[2px] border-primary rounded-[5px] hover:bg-white hover:text-primary transition-all duration-[.2] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-500 disabled:text-white ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default BtnPrimary;

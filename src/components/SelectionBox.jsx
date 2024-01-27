import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function SelectionBox({
  options,
  onOptionChange,
  value,
  isDisabled,
  children,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const selectionRef = useRef();
  function handleClickSelection() {
    if (isDisabled) {
      return;
    }
    setShowOptions((prev) => !prev);
  }
  function handleClickWindow(e) {
    if (e.target !== selectionRef.current) {
      setShowOptions(false);
    }
  }
  function hanldeClickOption(item) {
    onOptionChange(item);
  }
  useEffect(() => {
    window.addEventListener("click", handleClickWindow);
    return () => {
      window.removeEventListener("click", handleClickWindow);
    };
  }, []);
  return (
    <div>
      {/* label goes here */}
      {children}
      <div
        ref={selectionRef}
        className={`${
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        } relative p-[5px] leading-[20px] h-[30px] border-[1px] border-black bg-white  table rounded-[3px] text-[1.4rem] min-w-[5rem] font-bold`}
        onClick={handleClickSelection}
      >
        {value}
        <AnimatePresence>
          {showOptions ? (
            <motion.ul
              className="absolute top-[-10px] py-[1rem] bg-black left-[-1px] rounded-[5px] overflow-hidden max-h-[20rem] overflow-y-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {options.map((item) => (
                <li
                  key={item}
                  className=" text-white min-w-[10rem] p-[5px]
                hover:bg-gray-400 transition-[background-color] duration-[300] font-normal"
                  onClick={hanldeClickOption.bind(null, item)}
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SelectionBox;

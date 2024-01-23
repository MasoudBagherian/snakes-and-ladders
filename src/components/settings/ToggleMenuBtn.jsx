import { motion } from "framer-motion";

function ToggleMenuBtn({ onToggleMenu, showMenu }) {
  return (
    <button
      className="fixed z-[2] top-[2rem] left-[2rem] rounded-[50%] flex justify-center items-center flex-col w-[40px] h-[40px] border-[2px] border-primary bg-white"
      onClick={onToggleMenu}
    >
      <motion.span
        className="h-[3px] my-[2px] bg-primary rounded-[100px] w-[24px]"
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: showMenu ? 7 : 0, rotate: showMenu ? 45 : 0 }}
      ></motion.span>
      <motion.span
        className="h-[3px] my-[2px] bg-primary rounded-[100px] w-[24px]"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: showMenu ? -100 : 0, opacity: showMenu ? 0 : 1 }}
      ></motion.span>
      <motion.span
        className="h-[3px] my-[2px] bg-primary rounded-[100px] w-[24px]"
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: showMenu ? -7 : 0, rotate: showMenu ? 315 : 0 }}
      ></motion.span>
    </button>
  );
}

export default ToggleMenuBtn;

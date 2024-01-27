import { AnimatePresence, motion } from "framer-motion";
import { TiDelete as DeleteIcon } from "react-icons/ti";

function Modal({ isOpen, handleClick }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/30 z-[30]"
          onClick={handleClick}
        >
          <motion.div
            className="fixed border-[4px]  w-[60%] max-w-[40rem] left-[50%]  border-primary bg-white rounded-[10px] top-[50%]  max-h-[80%] overflow-y-auto"
            initial={{
              y: -500,
              x: "-50%",
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              y: "-50%",
              x: "-50%",
            }}
            exit={{
              y: -300,
              x: "-50%",
              opacity: 0,
            }}
          >
            <div className="flex flex-wrap px-[2rem] py-[1rem]   items-center">
              <h4 className="text-[2.4rem] font-roboto font-bold text-primary">
                Oops!!!
              </h4>

              <button
                className="w-[4rem] h-[4rem] text-primary-light shrink-0 ml-auto"
                onClick={handleClick}
              >
                <DeleteIcon className="w-full h-full" />
              </button>
            </div>
            <div className="px-[2rem] py-[1rem]">
              <p className="text-justify">
                Apparently, the sequence of optimal actions can't achieve the
                goal state. But you don't need to be mad at me. I can show you
                another path.
              </p>
            </div>
            <p className="bg-gray-300 px-[2rem] py-[1rem]">
              Close me to show you another path, baby.
            </p>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export default Modal;

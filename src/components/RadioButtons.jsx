import { AnimatePresence, motion } from "framer-motion";

function RadioOption({ text, handleClick, activeId, id }) {
  return (
    <button className="flex items-center text-[1.4rem]" onClick={handleClick}>
      <span className="relative shrink-0 w-[2.8rem] h-[2.8rem] border-[2px] rounded-[50%] border-primary mr-[1rem]">
        <AnimatePresence>
          {activeId === id ? (
            <motion.span
              className="absolute bg-primary top-[3px] bottom-[3px] left-[3px] right-[3px] rounded-[50%]"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            ></motion.span>
          ) : null}
        </AnimatePresence>
      </span>
      <p className="text-left">{text}</p>
    </button>
  );
}
function RadioButtons({ options, activeId, setActiveId }) {
  return (
    <div className="flex flex-col">
      {options.map(({ id, text }) => (
        <div key={id} className="mb-[1rem] last:mb-0">
          <RadioOption
            text={text}
            id={id}
            handleClick={setActiveId.bind(null, id)}
            activeId={activeId}
          />
        </div>
      ))}
    </div>
  );
}

export default RadioButtons;

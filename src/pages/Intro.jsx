import { useState } from "react";
import RadioButtons from "../components/RadioButtons";
import { v4 as uuidv4 } from "uuid";
import BtnPrimary from "../components/layout/BtnPrimary";
import { useNavigate } from "react-router-dom";
const introOptions = [
  {
    id: uuidv4(),
    text: "find success path by value iteration",
    link: "/find-path",
  },
  { id: uuidv4(), text: "search board", link: "/search-board" },
];

function Intro() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(introOptions[0].id);
  function getStarted() {
    const { link } = introOptions.find((item) => item.id === activeId);
    navigate(link);
  }
  return (
    <>
      <h1 className="my-[4rem] text-center text-[2.4rem]">
        snakes and ladders
      </h1>
      <div className="mb-[2rem]">
        <RadioButtons
          options={introOptions}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      </div>
      <BtnPrimary handleClick={getStarted}>get started</BtnPrimary>
    </>
  );
}

export default Intro;

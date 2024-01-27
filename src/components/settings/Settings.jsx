import React, { useState } from "react";
import ToggleMenuBtn from "./ToggleMenuBtn";
import { AnimatePresence } from "framer-motion";
import Menu from "./Menu";

function Settings({ isBtnDisabled }) {
  const [showMenu, setShowMenu] = useState(false);
  function toggleShowMenu() {
    setShowMenu((prev) => !prev);
  }
  return (
    <>
      <ToggleMenuBtn
        onToggleMenu={toggleShowMenu}
        showMenu={showMenu}
        isDisabled={isBtnDisabled}
      />

      <AnimatePresence>
        {showMenu ? <Menu onToggleMenu={toggleShowMenu} /> : null}
      </AnimatePresence>
    </>
  );
}

export default Settings;

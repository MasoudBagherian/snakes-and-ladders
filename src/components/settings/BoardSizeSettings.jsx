import { useEffect, useState } from "react";
import Board from "../Board";
import SelectionBox from "../SelectionBox";
import { mkNumericList } from "./Menu";
import SettinsHeader from "./SettinsHeader";
import Label from "../layout/Label";

function BoardSizeSettings({ row, col, updateRow, updateCol, boardArray }) {
  const [settingRow, setSettingRow] = useState(5);
  const [settingCol, setSettingCol] = useState(5);
  useEffect(() => {
    updateRow(settingRow);
    updateCol(settingCol);
  }, [settingRow, settingCol]);
  return (
    <>
      <SettinsHeader text="change row and column number" />
      <div className="flex flex-wrap mx-[-1rem] relative z-[1]">
        <div className="p-[1rem] ">
          <SelectionBox
            onOptionChange={setSettingRow}
            options={mkNumericList(5, 10)}
            value={settingRow}
          >
            <Label text="row number" />
          </SelectionBox>
        </div>
        <div className="p-[1rem] ">
          <SelectionBox
            onOptionChange={setSettingCol}
            options={mkNumericList(5, 10)}
            value={settingCol}
          >
            <Label text="column number" />
          </SelectionBox>
        </div>
      </div>

      <div className="overflow-x-auto ">
        <div className="max-w-[40rem] min-w-[30rem] mt-[2rem] mb-[4rem]">
          <Board row={row} col={col} boardArray={boardArray} />
        </div>
      </div>
    </>
  );
}

export default BoardSizeSettings;

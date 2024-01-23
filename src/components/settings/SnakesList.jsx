import { TiDelete as DeleteIcon } from "react-icons/ti";

function SnakesList({ snakes, deleteSnake }) {
  if (snakes.length === 0) return null;
  return (
    <div className="overflow-x-hidden">
      <div className="mb-[5px] flex flex-wrap mx-[-5px]">
        {snakes.map((item) => (
          <div
            style={{ color: item.color, backgroundColor: item.color }}
            key={item.name}
            className="p-[5px] border-[1px] m-[5px] inline-flex items-center rounded-[5px]"
          >
            <span className="table text-center leading-[24px] justify-center items-center bg-white rounded-[100px] box-content p-[3px]  min-w-[24px] h-[24px] text-[1.4rem] font-bold">
              {item.name}
            </span>
            <button
              className="w-[20px]  h-[20px] ml-[1rem] text-white"
              onClick={deleteSnake.bind(null, item.name)}
            >
              <DeleteIcon className="w-full h-full" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SnakesList;

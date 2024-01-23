function BoardGuidance({ snakes, ladders }) {
  return (
    <div className="mb-[2rem] p-[1rem] border-[2px] bg-primary-light border-primary table rounded-[10px]">
      <div className="flex flex-wrap mb-[2rem] items-center ">
        <span className="uppercase text-[1.4rem] text-white">snakes: </span>
        <div className="flex flex-wrap items-center">
          {snakes.map((item) => (
            <span
              style={{ backgroundColor: item.color }}
              key={item.name}
              className="flex rounded-[100px] text-white w-[2.4rem] h-[2.4rem] text-[1.4rem] p-[2px] box-content justify-center items-center mx-[5px] uppercase"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center">
        <span className="uppercase text-[1.4rem] text-white">ladders: </span>
        {ladders.map((item) => (
          <span
            style={{ backgroundColor: item.color }}
            className="flex rounded-[100px] text-white w-[2.4rem] h-[2.4rem] text-[1.4rem] p-[2px] box-content justify-center items-center mx-[5px] uppercase"
            key={item.name}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BoardGuidance;

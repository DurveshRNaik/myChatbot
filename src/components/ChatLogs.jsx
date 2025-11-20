function ChatLogs({ history, setHistory, setSelHistory }) {
  const clearHistory = () => {
    localStorage.clear();
    setHistory([]);
  };

  const clearHist = (selectedItem) => {
    let his = JSON.parse(localStorage.getItem("his"));
    his = his.filter((item) => {
      if (item != selectedItem) {
        return item;
      }
    });
    setHistory(his);
    localStorage.setItem("his", JSON.stringify(his));
  };

  return (
    <div className="col-span-1 dark:bg-zinc-300 bg-teal-400 pt-3">
      <h1 className="text-xl dark:text-blue-800 pb-2 text-blue-50">
        Chat History
        <button onClick={clearHistory} className="pl-1 pt-1 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="m656-120-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Zm-176 0q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q11 0 20.5-.5T520-203v81q-10 1-19.5 1.5t-20.5.5ZM120-560v-240h80v94q51-64 124.5-99T480-840q150 0 255 105t105 255h-80q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120Zm414 190-94-94v-216h80v184l56 56-42 70Z" />
          </svg>
        </button>
      </h1>
      <ul className="text-left text-blue-950 overflow-auto">
        {history &&
          history.map((item, index) => (
            <div className="flex justify-between pr-3" key={index}>
              <li
                key={index}
                onClick={() => setSelHistory(item)}
                className="p-1 pl-4 pr-3 w-full cursor-pointer hover:bg-blue-100 hover:text-zinc-900 truncate"
              >
                {item}
              </li>
              <button
                onClick={() => clearHist(item)}
                className="cursor-pointer hover:bg-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#1f1f1f"
                >
                  <path d="M200-440v-80h560v80H200Z" />
                </svg>
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default ChatLogs;

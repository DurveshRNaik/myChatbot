import Reply from "./Replies";

const QnA = ({ item, index }) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type == "q" ? "flex justify-end" : ""}
      >
        {item.type == "q" ? (
          <li
            className="dark:text-black text-white text-right pl-3 pr-3 leading-4 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl border-2 border-teal-200 dark:border-black dark:bg-amber-200 bg-cyan-600  max-w-140 w-fit "
            key={index + Math.random()}
          >
            <Reply
              res={item.text}
              totalResult={1}
              index={index}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((resItem, resIndex) => (
            <li
              className="dark:text-black text-white text-left pl-3 pr-3 leading-4 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl border-2 border-teal-200 dark:border-black dark:bg-amber-400 bg-cyan-900 max-w-150 w-fit"
              key={resIndex + Math.random()}
            >
              <Reply
                res={resItem}
                totalResult={item.length}
                type={item.type}
                index={resIndex}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QnA;

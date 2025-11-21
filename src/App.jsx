import { useEffect, useRef, useState } from "react";
import "./App.css";
import { URL } from "./constants";
import ChatLogs from "./components/ChatLogs";
import QnA from "./components/QnA";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("his"))
  );
  const [selHistory, setSelHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  const startHere = async () => {
    if (!question && !selHistory) {
      return false;
    }
    if (question) {
      if (localStorage.getItem("his")) {
        let his = JSON.parse(localStorage.getItem("his"));
        his = his.slice(0, 19);
        his = [question, ...his];
        his = his.map((item) =>
          (item ?? "").trim().replace(/^./, (c) => c.toUpperCase())
        );
        his = [...new Set(his)];
        localStorage.setItem("his", JSON.stringify(his));
        setHistory(his);
      } else {
        localStorage.setItem("his", JSON.stringify([question]));
        setHistory([question]);
      }
    }
    const pdata = question ? question : selHistory;
    const payload = {
      contents: [
        {
          parts: [{ text: pdata }],
        },
      ],
    };

    setLoader(true);
    let reply = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    reply = await reply.json();
    let dataReply = reply.candidates[0].content.parts[0].text;
    dataReply = dataReply.split("* ");
    dataReply = dataReply.map((item) => item.trim());
    setResult([
      ...result,
      { type: "q", text: question ? question : selHistory },
      { type: "r", text: dataReply },
    ]);
    setQuestion("");
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);
    setLoader(false);
  };

  const clearHistory = () => {
    localStorage.clear();
    setHistory([]);
  };

  const isEnter = (event) => {
    if (event.key == "Enter") {
      startHere();
    }
  };

  useEffect(() => {
    startHere();
  }, [selHistory]);

  //dark mode feature
  const [darkMode, setDarkMode] = useState("dark");
  useEffect(() => {
    if (darkMode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode == "dark" ? "dark" : "light"}>
      <div className="grid grid-cols-5 h-screen text-center">
        <select
          onChange={(event) => setDarkMode(event.target.value)}
          className="fixed  top-0.6 p-2 "
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <ChatLogs
          history={history}
          setHistory={setHistory}
          setSelHistory={setSelHistory}
        />
        <div className="col-span-4 dark:bg-zinc-800 bg-teal-200 p-5 pt-3 pb-0">
          <h1 className="text-4xl dark:text-amber-100 text-amber-950 pb-2">
            Welcome User, Ask me anything
          </h1>
          {loader ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 w-8 h-8 text-neutral-tertiary animate-spin fill-brand"
                viewBox="0 0 100 101"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
          <div
            ref={scrollToAns}
            className="container h-145 overflow-scroll hide-scroll"
          >
            <ul>
              {result.map((item, index) => (
                <QnA key={index} item={item} index={index} />
              ))}
            </ul>
          </div>
          <div
            className=" dark:bg-zinc-700 bg-teal-100 w-full max-w-xl p-1 pr-5 pl-2 mx-40 rounded-4xl border border-b-emerald-950 flex items-center h-13 fixed bottom-5 left-1/2 -translate-x-1/2">
            <input
              type="text"
              value={question}
              onKeyDown={isEnter}
              onChange={(event) => setQuestion(event.target.value)}
              className="w-full h-full p-3 outline-none dark:text-white dark:placeholder-amber-50"
              placeholder="Start your conversation here"
            />
            <button onClick={startHere}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

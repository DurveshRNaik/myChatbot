import { useEffect, useState } from "react";
import { checkHeading, replaceStars } from "../helper";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";

const Reply = ({ res, totalResult, index, type }) => {
  const [heading, setHeading] = useState(false);
  const [reply, setReply] = useState(res);

  useEffect(() => {
    if (checkHeading(res)) {
      setHeading(true);
      setReply(replaceStars(res));
    }
  }, []);

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={dark}
          pretag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index == 0 && totalResult > 1 ? (
        <span className="pt-2 text-xl block">{reply}</span>
      ) : heading ? (
        <span className="pt-2 text-lg block">{reply} </span>
      ) : (
        <span className={type == "a" ? "pl-4" : "pl-2 pr-2"}>
          <ReactMarkdown components={renderer}>{reply}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default Reply;

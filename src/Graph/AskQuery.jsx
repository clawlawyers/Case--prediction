import { Close } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import loaderGif from "../assets/queryLoader.gif";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { NODE_API_ENDPOINT } from "../utils/utils";

const AskQuery = ({ handleClose }) => {
  const [chatArr, setChatArr] = useState([]);
  const [query, setQuery] = useState("");
  const userId = useSelector((state) => state.auth.userId);

  const scrollRef = useRef(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [chatArr]);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    try {
      const newPrompt = [
        {
          isUser: true,
          message: query,
        },
        {
          isUser: false,
          message: "loader",
        },
      ];
      setChatArr((prevChar) => [...prevChar, ...newPrompt]);
      setQuery("");
      const response = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/ask_query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            query: query,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const setMessage = {
          isUser: false,
          message: data?.data
            .replaceAll("\\\\n\\\\n", "<br/>")
            .replaceAll("\\\\n", "<br/>")
            .replaceAll("\\n\\n", "<br/>")
            .replaceAll("\\n", "<br/>")
            .replaceAll("\n", "<br/>")
            .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
            .replaceAll("\\", "")
            .replaceAll('"', "")
            .replaceAll(":", " :")
            .replaceAll("#", ""),
        };
        setChatArr((prev) => {
          const updatedChatArr = [...prev];
          updatedChatArr.pop();
          updatedChatArr.push(setMessage);
          return updatedChatArr;
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dbGenerate();
  }, []);

  const dbGenerate = async () => {
    try {
      const response = await fetch(
        `${NODE_API_ENDPOINT}/casePrediction/api/db_generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 bg-[#1D2330] text-white p-2  rounded-lg">
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex gap-1 items-center">
          <p className="m-0 text-white text-xl font-semibold">Ask Your Query</p>
        </div>
        <Close className="cursor-pointer" onClick={handleClose} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-auto flex flex-col gap-2">
        {chatArr.map((x, index) => (
          <div key={index}>
            {x.message === "loader" ? (
              <div className="w-full flex justify-start">
                <div className="w-fit flex justify-start">
                  <p className=" bg-white text-xs text-black rounded-t-xl rounded-r-xl">
                    <img src={loaderGif} width={50} alt="loading" />
                  </p>
                </div>
              </div>
            ) : (
              <>
                {x.isUser ? (
                  <div className="w-full flex justify-end">
                    <div className="w-5/6 flex justify-end">
                      <p className=" bg-[#005F62] p-2 text-sm text-white rounded-t-xl rounded-l-xl">
                        {x.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex justify-start">
                    <div className="w-5/6 flex justify-start">
                      <p
                        dangerouslySetInnerHTML={{ __html: x.message }}
                        className=" bg-white p-2 text-sm text-black rounded-t-xl rounded-r-xl"
                      ></p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleQuerySubmit} className="flex items-center gap-2">
        <input
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 text-black focus:outline-none p-1 rounded-lg"
          placeholder="Enter your query..."
        />
        <button
          disabled={query === ""}
          className="bg-transparent p-0"
          type="submit"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default AskQuery;

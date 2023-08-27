import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Loading } from "./Loading";
export const Dictionary = () => {
  const [dictData, setDictData] = useState([]);
  const [title, setTitle] = useState("Words");
  const [word, setWord] = useState("");
  const [err, setErr] = useState(false);
  async function networkCallFunction() {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (response.ok) {
      setErr(false);
      const data = await response.json();
      setDictData(data[0]);
      setTitle(data[0].word);
      document.title="Explore "+data[0].word
    } else {
      setErr(true);
    }
  }

  useEffect(() => {
    networkCallFunction();
  }, [word]);
  function playAudio() {
    const audio = new Audio(
      dictData.phonetics[1].audio && dictData.phonetics[1].audio
    );
    audio.play();
  }
  const handleText = debounce((text) => {
    setWord(text);
  }, 1000);
  return (
    <div className="dark:text-white w-full  mx-auto flex justify-center items-center">
      <div className="mt-16 flex w-[95%] sm:w-3/4 flex-col gap-16 justify-center">
        <header className="text-darkSecondary text-4xl text-center py-2 tracking-wider">
          Explore {title}
        </header>
        <div className="flex flex-col gap-16 min-h-[50vh]">
          <div className="flex items-center gap-8 w-full mx-auto border-b-2 border-b-darkSecondary sm:w-[500px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              className=" py-2 outline-none bg-transparent caret-darkSecondary"
              placeholder="Start Explore your words..."
              onChange={(e) => {
                handleText(e.target.value);
              }}
            />
          </div>
          {err ? (
            <p>No Word Found</p>
          ) : dictData.length != 0 ? (
            <div className="gap-8 flex-col flex">
              <p onClick={playAudio} className="cursor-pointer">
                Touch to Hear{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 inline-block"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              </p>
              <div className="flex flex-col gap-8">
                {dictData.meanings.map((data, i) => (
                  <ul key={i} className="flex flex-col gap-4">
                    <header className="text-2xl text-darkSecondary  uppercase tracking-wider ">
                      {data.partOfSpeech}
                    </header>

                    {data.definitions.length === 0 ? "" : "Definitions :"}
                    {data.definitions.map((definition, i) => (
                      <li>
                        <p className="text-slate-500">
                          {definition.definition}
                          <li>
                            {definition.example && (
                              <span className="text-slate-300">Example : </span>
                            )}
                            {definition.example}
                          </li>
                        </p>
                      </li>
                    ))}
                    {data.synonyms.length === 0 ? "" : "Synonyms :"}
                    {data.synonyms.map((synonym, i) => (
                      <p key={i} className="text-slate-500">
                        {synonym}
                      </p>
                    ))}
                    {data.antonyms.length === 0 ? "" : "Antonyms :"}
                    {data.antonyms.map((antonym, i) => (
                      <p key={i} className="text-slate-500">
                        {antonym}
                      </p>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

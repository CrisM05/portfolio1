import { useContext, useEffect, useReducer, useState } from "react";
import "../contexts/typingContext";
import typingContext from "../contexts/typingContext";
import "../styles/Terminal.scss";
import todo from "../ToDo.txt?raw";
import PrevLines from "./PrevLines";

type Props = {};

type State = {
  input: string;
};

type Action =
  | {
      type: "add key";
      key: string;
    }
  | {
      type: "delete";
    }
  | {
      type: "clear";
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add key":
      return { ...state, input: state.input + action.key };
    case "delete":
      return {
        ...state,
        input: state.input.substring(0, state.input.length - 1),
      };
    case "clear":
      return {
        ...state,
        input: "",
      };
    default:
      return state;
  }
};

export default function Terminal({}: Props) {
  const [currentDirectory, setCurrentDirectory] = useState("cris");
  const [path, setPath] = useState(`${currentDirectory} $ `);
  const [endOfType, setEndOfType] = useState("_");
  const [typingState, dispatch] = useReducer(reducer, { input: "" });
  const [entered, setEntered] = useState(false);
  const [tabbed, setTabbed] = useState(false);

  const { isTyping, changeTyping } = useContext(typingContext);

  const [prevLines, setPrevLines] = useState<string[]>([]);

  let blink = true;
  //Logic for adding characters to terminal
  const userInput = (e: KeyboardEvent) => {
    const key = e.key;
    // console.log(key);
    switch (key) {
      case "Enter":
        setEntered((pre) => !pre);
        break;
      case "Backspace":
        dispatch({ type: "delete" });
        break;
      case "Tab":
        e.preventDefault();
        setTabbed((pre) => !pre);
        break;
      default:
        if (key.length < 2) {
          dispatch({ type: "add key", key });
        }
        break;
    }
    // if (key === "Enter") {
    //   setEntered((pre) => !pre);
    // } else if (key === "Backspace") {
    //   dispatch({ type: "delete" });
    // } else if (key.length < 2) {
    //   dispatch({ type: "add key", key });
    // }
  };

  useEffect(() => {
    if (isTyping) {
      window.addEventListener("keydown", userInput);
      const startBlinking = setInterval(() => {
        if (blink) {
          setEndOfType("");
        } else {
          setEndOfType("_");
        }
        blink = !blink;
      }, 450);
      return () => {
        clearInterval(startBlinking);
        window.removeEventListener("keydown", userInput);
      };
    } else {
      setEndOfType("");
      window.removeEventListener("keydown", userInput);
    }
  }, [isTyping]);

  const addToLines = (toAdd: string[]) => {
    setPrevLines((pre) => [...pre, ...toAdd]);
  };

  useEffect(() => {
    // const logImage = async() => {
    //   convertImage("../assets/Headshot.jpg", {}, (err, img) => {
    //     console.log(err || img);
    //   });
    // }
    if (typingState.input.length > 0) {
      const wholeLine = typingState.input.split(" ");
      const [command] = wholeLine;
      addToLines(["user|" + path + typingState.input]);
      dispatch({ type: "clear" });
      //Main logic for what the user types
      switch (command) {
        case "clear":
          setPrevLines([]);
          break;
        case "contact":
          const contactLines = [
            "text|Contact Info:",
            "text|Email:",
            "a|cristofertmartinez05@gmail.com",
          ];
          // logImage();
          setPrevLines((pre) => [...pre, ...contactLines]);
          break;
        case "ls":
          const lines = [" contact", " projects", " linkedIn", " gitHub"].map(
            (el) => "text|" + el
          );
          addToLines(lines);
          break;
        case "github":
          const gitHubLines = [
            "text|Github Information:",
            "a|https://github.com/CrisM05",
          ];
          addToLines(gitHubLines);
          break;
        case "todo":
          const todoLines = todo.split("\n").map((el) => "- " + el);
          addToLines(todoLines);
          // console.log(todo)
          break;
        default:
          setPrevLines((pre) => [
            ...pre,
            `e|-bash: ${command}: command not found`,
          ]);
          break;
      }
    }
  }, [entered]);

  useEffect(() => {
    console.log("AHHHHh");
  }, [prevLines]);

  return (
    <div
      id="terminal"
      className="half terminal-color"
      onClick={() => changeTyping(true)}
    >
      <PrevLines lines={prevLines} path={path}/>
      <span>{path}</span>
      <span className="text">{typingState.input + endOfType}</span>
    </div>
  );
}

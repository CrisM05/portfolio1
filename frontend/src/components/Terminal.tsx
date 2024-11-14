import { useContext, useEffect, useReducer, useState } from "react";
import "../contexts/typingContext";
import typingContext from "../contexts/typingContext";
import "../styles/Terminal.scss";
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
    type: "get"
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
    case "get":
      return state;
    default:
      return state;
  }
};

export default function Terminal({}: Props) {
  const [currentDirectory, setCurrentDirectory] = useState("~/");
  const [path, setPath] = useState(`${currentDirectory} $`);
  const [endOfType, setEndOfType] = useState("_");
  const [typingState, dispatch] = useReducer(reducer, { input: "" });
  // const typed = useRef('');
  const { isTyping, changeTyping } = useContext(typingContext);

  let blink = true;
  //Logic for adding characters to terminal
  const userInput = (e: KeyboardEvent) => {
    changeTyping(false);
    const key = e.key;
    if (key === "Enter") {
      const next = reducer(typingState, {type: "add key", key:''});
      console.log(typingState)
      console.log(next)
    } else if (key === "Backspace") {
      dispatch({ type: "delete" });
    } else if (key.length < 2) {
      dispatch({type: "add key", key});
    }
    changeTyping(true);
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

  return (
    <div
      id="terminal"
      className="half terminal-color"
      onClick={() => changeTyping(true)}
    >
      <span>
        <p>
          {path} {typingState.input + endOfType}
        </p>
      </span>
    </div>
  );
}

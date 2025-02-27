import { createContext } from "react";

interface TypingContext {
  isTyping: boolean,
  changeTyping: (typing:boolean) => void,
  darkMode: boolean,
  changeDarkMode: (to:boolean) => void
}

const base: TypingContext = {
  isTyping: true,
  changeTyping: () => {},
  darkMode: true,
  changeDarkMode: () => {}
}

const typingContext = createContext<TypingContext>(base);

export default typingContext;

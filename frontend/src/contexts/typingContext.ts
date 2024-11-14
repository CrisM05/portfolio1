import { createContext } from "react";

interface TypingContext {
  isTyping: boolean,
  changeTyping: (typing:boolean) => void
}

const base: TypingContext = {
  isTyping: true,
  changeTyping: () => {}
}

const typingContext = createContext<TypingContext>(base);

export default typingContext;

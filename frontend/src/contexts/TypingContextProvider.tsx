import { ReactNode, useState } from "react";
import typingContext from "./typingContext";
type Props = {
  children: ReactNode;
};

export default function TypingContextProvider({ children }: Props) {
  const [isTyping, setIsTyping] = useState(true);
  const changeTyping = (typing: boolean) => {
    setIsTyping(typing);
  }
  const [darkMode, setDarkMode] = useState(true);
  const changeDarkMode = (to:boolean) => {
    setDarkMode(to);
  }
  
  return (
    <typingContext.Provider value={{isTyping, changeTyping, darkMode, changeDarkMode}}>{children}</typingContext.Provider>
  );
}

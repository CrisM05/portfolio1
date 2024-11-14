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
  
  return (
    <typingContext.Provider value={{isTyping, changeTyping}}>{children}</typingContext.Provider>
  );
}

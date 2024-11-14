import { useContext } from "react";
import "../styles/Commands.scss"
import typingContext from "../contexts/typingContext";

type Props = {};

export default function Commands({}: Props) {
  const {changeTyping} = useContext(typingContext);


  return (
    <div className="half command-color" onClick={() => changeTyping(false)}>
      <ul>
        <li>cd (changes directory)</li>
      </ul>
    </div>
  );
}

import { memo } from "react";

type Props = { lines: string[]; path: string };

export default memo(function PrevLines({ lines, path }: Props) {
  return lines?.map((line, idx) => {
    const [tag, text] = line.split("|");
    const isUser = tag === "user";
    const tags: { [key: string]: JSX.Element } = {
      user: <p className="">{path}</p>,
      a: (
        <a href={text}>
          <p>{text}</p>
        </a>
      ),
      text: <p>{text}</p>,
      e: <p className="error">{text}</p>,
    };
    return (
      <span key={idx} className={isUser ? "" : "text"}>
        {tags[tag]}
      </span>
    );
  });
});

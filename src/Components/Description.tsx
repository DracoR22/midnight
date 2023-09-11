import { ChevronDown, ChevronUp } from "~/Components/Icons/Chevron";
import { useState } from "react";

export default function Description({
  text,
  length,
  border,
}: {
  text: string;
  length: number;
  border?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (text?.length === 0 || text === null) {
    return null;
  } else if (text?.length < length) {
    return (
      <>
        {border ? <div className="border-b border-neutral-700"></div> : ""}
        <p className="my-3 text-left text-sm font-semibold text-neutral-100">
          {text}
        </p>
      </>
    );
  } else {
    return (
      <>
        {border ? <div className="border-b border-neutral-700"></div> : ""}
        <div className="relative w-full ">
          <button
            onClick={toggleExpand}
            className="flex flex-row place-content-evenly"
          >
            <p
              className={`text-left text-sm font-semibold text-white ${
                !isExpanded ? "line-clamp-2" : ""
              }`}
            >
              {text}
            </p>
            <span className="items-end ">
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
        </div>
      </>
    );
  }
}
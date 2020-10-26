import React, { useState } from "react";

type ExpandableTextProps = {
  content: string;
  maxLength: number;
};

export const ExpandableText = ({ content, maxLength }: ExpandableTextProps) => {
  const [show, setShow] = useState(false);

  if (content.length < maxLength || show) {
    return <span>{content}</span>;
  }

  return (
    <span>
      {`${content.slice(0, maxLength)}...`}
      <a style={{ cursor: "pointer" }} onClick={() => setShow(true)}>
        &nbsp;Read More
      </a>
    </span>
  );
};

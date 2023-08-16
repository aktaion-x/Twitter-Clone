import { useState } from "react";

const ResizableTextarea = ({ setTextareaValue, textareaValue, placeholder }) => {
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleTextareaChange = event => {
    setTextareaValue(event.target.value);
    setTextareaHeight("auto");
    setTextareaHeight(`${event.target.scrollHeight}px`);
  };

  return (
    <textarea
      value={textareaValue}
      onChange={handleTextareaChange}
      style={{ height: textareaHeight, minHeight: "32px" }}
      placeholder={placeholder}
    />
  );
};

export default ResizableTextarea;

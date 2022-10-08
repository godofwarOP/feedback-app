import React from "react";

const Card: React.FC<{ reverse: boolean | null; children: React.ReactNode }> = (
  props
) => {
  return (
    <div
      className="card"
      style={{
        backgroundColor: props.reverse ? "rgba(0,0,0,0.4)" : "#fff",
        color: props.reverse ? "#fff" : "#000",
      }}
    >
      {props.children}
    </div>
  );
};

export default Card;

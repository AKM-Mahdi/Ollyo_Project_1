import React from "react";
import "./SingleImage.css";

const SingleImage = ({ image, isSelected, toggleSelection, provided }) => {
  return (
    <div
      ref={provided ? provided.innerRef : null}
      {...(provided ? provided.draggableProps : {})}
      {...(provided ? provided.dragHandleProps : {})}
    >
      <img
        className={` ${isSelected ? "selected" : ""}`}
        src={image}
        alt=""
        onClick={toggleSelection}
      />
    </div>
  );
};

export default SingleImage;

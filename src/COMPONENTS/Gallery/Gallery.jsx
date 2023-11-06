import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Gallery.css";
import SingleImage from "../SingleImage/SingleImage";

const Gallery = ({
  selectedImages,
  images,
  handleImageChange,
  toggleSelection,
  handleDeleteSelectedImages,
}) => {
  const [characters, updateCharacters] = useState(images);

  useEffect(() => {
    updateCharacters(images);
  }, [images]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedCharacters = Array.from(characters);
    const [draggedItem] = updatedCharacters.splice(result.source.index, 1);
    updatedCharacters.splice(result.destination.index, 0, draggedItem);

    updateCharacters(updatedCharacters);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* Gallery Header */}
      <div className="galleryHeader">
        <div className="left">
          <h2>
            ✅{" "}
            {selectedImages.length === 0
              ? " 0 File"
              : `${selectedImages.length} Files`}{" "}
            Selected
          </h2>
        </div>
        <div className="right">
          <h2 onClick={handleDeleteSelectedImages} className="btn">
            Delete
          </h2>
        </div>
      </div>

      {/* Gallery Images */}
      <div className="galleryLayouts">
        <Droppable droppableId="gallery">
          {(provided) => (
            <div
              className="galleryImagesGrid"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {characters.map((image, index) => (
                <Draggable
                  key={index}
                  draggableId={`image-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <SingleImage
                      image={image}
                      isSelected={selectedImages.includes(index)}
                      toggleSelection={() => toggleSelection(index)}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="addImagesBtn">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Gallery;

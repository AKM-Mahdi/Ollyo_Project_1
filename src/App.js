import { useEffect, useState } from "react";
import "./App.css";
import Gallery from "./COMPONENTS/Gallery/Gallery";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);

  const [images, setImages] = useState([
    "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_640.jpg",
    "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_640.jpg",
    "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_640.jpg",
  ]);

  useEffect(() => {
    setImages(images);
  }, []);

  const handleImageChange = (e) => {
    const newImages = e.target.files;

    if (newImages) {
      const allImageUrl = Array.from(newImages).map((img) =>
        URL.createObjectURL(img)
      );

      setImages((prevImages) => [...prevImages, ...allImageUrl]);
      setSelectedImages([]);
    }
  };

  const toggleSelection = (index) => {
    const isSelected = selectedImages.includes(index);

    if (isSelected) {
      setSelectedImages((prevSelected) =>
        prevSelected.filter((selected) => selected !== index)
      );
    } else {
      setSelectedImages((prevSelected) => [...prevSelected, index]);
      console.log(selectedImages);
    }
  };

  const handleDeleteSelectedImages = () => {
    const remainingImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );

    setImages(remainingImages);
    setSelectedImages([]);
  };

  return (
    <div className="App">
      <Gallery
        selectedImages={selectedImages}
        images={images}
        handleImageChange={handleImageChange}
        toggleSelection={toggleSelection}
        handleDeleteSelectedImages={handleDeleteSelectedImages}
      ></Gallery>
    </div>
  );
}

export default App;

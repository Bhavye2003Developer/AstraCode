import { useState } from "react";
import "../../styles/DarkLightToggleButton.css";

const DarkLightToggleButton = ({ setStyle, style }) => {
  const [sunVisible, setSunVisible] = useState(false); // State to manage visibility of sun
  const [moonVisible, setMoonVisible] = useState(true); // State to manage visibility of moon

  // Toggle function to handle button click
  const toggleVisibility = () => {
    setSunVisible(!sunVisible);
    setMoonVisible(!moonVisible);
    setStyle({ ...style, darkTheme: !moonVisible });
  };

  return (
    <button
      className="container"
      aria-label="Toggle color mode"
      title="Toggle color mode"
      onClick={() => {
        toggleVisibility();
      }} // Attach onClick event handler
    >
      <div className={`sun ${sunVisible ? "visible" : ""}`}></div>{" "}
      {/* Add sun visibility class dynamically */}
      <div className={`moon ${moonVisible ? "visible" : ""}`}>
        <div className="star"></div>
        <div className="star small"></div>
      </div>
    </button>
  );
};

export default DarkLightToggleButton;

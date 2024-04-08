import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import "../styles/styles.css";

const App = () => {
  return (
    <div id="app">
      <Home />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);

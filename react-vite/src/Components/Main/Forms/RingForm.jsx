import { useState } from "react";
import "../CSS/rings.css";

//Ring Counter
const RingsCounter = () => {
  const [rings, setRings] = useState(0);
//Handle the rings
  const handleAddRing = () => {
    const newCount = rings + 1;
    setRings(newCount);
    if (newCount === 10) {
      alert("You collected 10 rings!"); // Events up, data down example from class
    }
  };
//text for rings

//Retutn this for rendering
  return (
    <div className="rings-counter">
      <h2>Ring Collector</h2>
      <p>Rings Collected: {rings}</p>
      <button onClick={handleAddRing}>Collect Ring</button>
    </div>
  );
};
//Export it out
export default RingsCounter;

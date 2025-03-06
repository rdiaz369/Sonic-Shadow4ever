import { useState } from "react";
import "../CSS/rings.css";


const RingsCounter = () => {
  const [rings, setRings] = useState(0);

  const handleAddRing = () => {
    const newCount = rings + 1;
    setRings(newCount);
    if (newCount === 10) {
      alert("You collected 10 rings!"); // Events up, data down example from class
    }
  };

  return (
    <div className="rings-counter">
      <h2>Ring Collector</h2>
      <p>Rings Collected: {rings}</p>
      <button onClick={handleAddRing}>Collect Ring</button>
    </div>
  );
};

export default RingsCounter;

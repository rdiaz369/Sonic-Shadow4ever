import { useEffect, useState } from "react";
import { getAllChar } from "../Services/Characters.jsx";
import MainList from "./MainList.js";

const Main = () => {
  const [characters, setCharacters] = useState([]); // Character data
  const [search, setSearch] = useState(""); // Search input
  const [sortOrder, setSortOrder] = useState("default"); // Sorting order

  // Fetch character data on mount
  useEffect(() => {
    getAllChar()
      .then((data) => {
        console.log("Fetched characters:", data);
        setCharacters(data);
      })
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  console.log("Characters in state:", characters);

  // Filter characters based on search input
  const filteredCharacters = characters.filter((char) =>
    `${char.firstName} ${char.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Search query:", search);
  console.log("Filtered characters:", filteredCharacters);

  // Sort characters by name or powers
  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (sortOrder === "name") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortOrder === "powers") {
      return a.powers.localeCompare(b.powers);
    }
    return 0; // No sorting
  });

  return (
    <div>
      <h1>Welcome to Green Hills</h1>
      <p>Search for your favorite Sonic characters below!</p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search characters..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.5rem", margin: "1rem 0", width: "100%" }}
      />

      {/* Sorting Dropdown */}
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={(e) => setSortOrder(e.target.value)}>
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="powers">Powers</option>
      </select>

      {/* Render Character List */}
      <section id="characters" style={{ padding: "2rem 0" }}>
        <MainList characters={sortedCharacters} />
      </section>
    </div>
  );
};

export default Main;

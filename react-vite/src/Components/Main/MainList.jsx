const MainList = ({ characters }) => {
    // Error checking
    if (characters.length === 0) {
      return <p>No characters found.</p>;
    }
  
    return (
      <div className="character-list">
        {characters.map((char) => (
          <div
            className="character-card"
            key={char.id}
            style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}
          >
            <h3>
              {char.firstName} {char.lastName}
            </h3>
            <p>
              <strong>Powers:</strong> {char.powers}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  export default MainList;
  
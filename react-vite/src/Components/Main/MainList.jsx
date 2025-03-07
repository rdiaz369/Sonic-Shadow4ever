const MainList = ({ characters }) => {
    return (
      <div>
        {characters.length === 0 ? (
          <p>No characters found.</p>
        ) : (
          characters.map((character) => (
            <div key={character.id}>
              <h3>{character.name}</h3>
              <p>Gender: {character.gender}</p>
              <p>Species: {character.species}</p>
              <p>Age: {character.age}</p>
              <p>Powers: {character.powers}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
export default MainList;
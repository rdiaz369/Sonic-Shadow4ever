import Parse from "parse"; //using our parse
//Characters.jsx

export const getAllCharacters = () => {
    const Character = Parse.Object.extend("Characters"); // Access the Characters class
    const query = new Parse.Query(Character);
    
    // Query for the characters
    return query
        .find() // Fetch all records
        .then((results) => {
            console.log("Fetched characters:", results); // Check the fetched data

            // Map the results to a more readable structure
            return results.map((char) => ({
                id: char.id,
                name: char.get("name"), // Assuming 'name' is the correct field in Back4App
                gender: char.get("Gender"),
                species: char.get("Species"),
                powers: char.get("Powers"),
                age: char.get("Age"),
            }));
        })
        .catch((error) => {
            console.error("Error fetching characters:", error);
            return []; // Return an empty array if there's an error
        });
};
  
export const getCharacterById = async (id) => {
    const Character = Parse.Object.extend("Characters");
    const query = new Parse.Query(Character);
    query.include("Powers");
  
    try {
      const char = await query.get(id);
      return {
        id: char.id,
        name: char.get("name"),
        gender: char.get("Gender"),
        species: char.get("Species"),
        age: char.get("Age"),
        powers: char.get("Powers") ? char.get("Powers").get("Powers") : "Unknown",
      };
    } catch (error) {
      console.error("Error fetching character:", error);
      return null;
    }
};
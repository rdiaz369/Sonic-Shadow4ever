import Parse from "../../../enviroments.js"; //using our parse

// Function to GET all characters from Back4App
export const getAllChar = async () => {
  const Character = Parse.Object.extend("Character");
  const query = new Parse.Query(Character);

  try {
    const results = await query.find();
    console.log("Fetched characters:", results);

    // Convert Parse objects into plain JavaScript objects
    return results.map((char) => ({
      id: char.id,
      firstName: char.get("firstName"),
      lastName: char.get("lastName"),
      powers: char.get("powers"),
    }));
  } catch (error) {
    console.error("GET Error:", error);
    return []; // Return an empty array on failure
  }
};
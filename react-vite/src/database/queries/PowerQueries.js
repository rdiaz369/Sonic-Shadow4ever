import Power from "../models/Power";
import Parse from "parse";

export const getPowersByCharacter = async (characterId) => {
  const query = new Parse.Query(Power);
  query.equalTo("characters", { __type: "Pointer", className: "Character", objectId: characterId });
  try {
    const results = await query.find();
    return results;
  } catch (error) {
    console.error("Error fetching powers:", error);
  }
};

// CREATE a new Power
export const createPower = async (name) => {
  const power = new Power();
  power.set("name", name);

  try {
    await power.save();
    return power;
  } catch (error) {
    console.error("Error creating power:", error);
  }
};

// GET All Powers
export const getAllPowers = async () => {
  const query = new Parse.Query(Power);
  try {
    return await query.find();
  } catch (error) {
    console.error("Error fetching powers:", error);
  }
};

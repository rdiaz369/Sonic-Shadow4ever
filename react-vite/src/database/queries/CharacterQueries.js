import Parse from 'parse';

// Create the Character class (the correct class name now is 'Characters')
const Characters = Parse.Object.extend('Characters');

// Create a function to fetch all characters, including their powers
export const getAllCharacters = async () => {
  const query = new Parse.Query(Characters);
  query.include('powers');  // Include the related powers

  try {
    const results = await query.find();
    
    // Loop through each character and fetch the related powers
    const charactersWithPowers = await Promise.all(results.map(async (character) => {
      const powersRelation = character.relation('powers');
      const powersQuery = powersRelation.query();
      const powers = await powersQuery.find();

      console.log('Character:', character.get('name'));
      console.log('Powers:', powers.map(power => power.get('name')).join(', '));

      return {
        ...character.toJSON(),
        powers: powers.map(power => power.get('name')),
      };
    }));

    console.log('Fetched characters:', charactersWithPowers);
    return charactersWithPowers;
  } catch (error) {
    console.error('Error fetching characters:', error.message);
    console.error('Stack trace:', error.stack);
    return [];
  }
};

// Function to create a new character, linking to multiple powers
export const createCharacter = async (name, Species, Age, Gender, powers) => {
    try {
      const character = new Parse.Object('Characters'); // Updated to 'Characters'
      
      // Set the attributes for the character
      character.set('name', name);
      character.set('species', Species);
      character.set('age', Age);
      character.set('gender', Gender);
  
      // Split powers into an array
      const powerNames = powers.split(',').map(power => power.trim());
      console.log('Power Names:', powerNames);
  
      // Query to find or create powers
      const powerObjects = await Promise.all(
        powerNames.map(async (powerName) => {
          const powerQuery = new Parse.Query('Powers');  // Ensure we query the correct Powers class
          powerQuery.equalTo('name', powerName);
          
          let power = await powerQuery.first();
          if (!power) {
            // Log before attempting to create the power
            console.log(`Creating new power: ${powerName}`);
            
            power = new Parse.Object('Powers');
            power.set('name', powerName);
            
            try {
              await power.save();
            } catch (error) {
              console.error(`Error saving new power: ${powerName}`, error.message);
              console.error('Stack trace:', error.stack);
            }
          }
  
          return power;
        })
      );
  
      console.log('Power objects:', powerObjects);
  
      // Add the related powers to the character
      const relation = character.relation('powers');
      powerObjects.forEach(power => relation.add(power));
  
      // Save the character with the related powers
      await character.save();
      console.log('Character and powers saved successfully.');
    } catch (error) {
      console.error('Error creating character:', error.message);
      console.error('Stack trace:', error.stack);
    }
  };
  

// Function to get a single character by ID (with powers)
export const getCharacterById = async (id) => {
  const query = new Parse.Query(Characters);
  query.include('powers');

  try {
    const character = await query.get(id);

    // Get powers
    const powers = character.relation('powers').toArray();
    console.log('Character:', character.get('name'));
    console.log('Powers:', powers.map(power => power.get('name')).join(', '));

    return character;
  } catch (error) {
    console.error('Error fetching character by ID:', error.message);
    console.error('Stack trace:', error.stack);
    return null;
  }
};

// Function to update a character's powers
export const updateCharacterPowers = async (characterId, newPowers) => {
  const query = new Parse.Query(Characters);

  try {
    const character = await query.get(characterId);

    // Split the new powers into an array
    const powerNames = newPowers.split(',').map(power => power.trim());

    // Query to find or create new powers
    const powerObjects = await Promise.all(
      powerNames.map(async (powerName) => {
        const powerQuery = new Parse.Query('Powers');
        powerQuery.equalTo('name', powerName);
        let power = await powerQuery.first();

        // Create the power if it doesn't exist
        if (!power) {
          power = new Parse.Object('Powers');
          power.set('name', powerName);
          try {
            await power.save();
          } catch (error) {
            console.error(`Error saving new power: ${powerName}`, error.message);
            console.error('Stack trace:', error.stack);
          }
        }

        return power;
      })
    );

    // Set new powers to the character
    const relation = character.relation('powers');
    powerObjects.forEach(power => relation.add(power));

    // Save the updated character with new powers
    await character.save();
    console.log('Character powers updated successfully.');
  } catch (error) {
    console.error('Error updating character powers:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

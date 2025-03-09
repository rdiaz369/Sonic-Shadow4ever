import Parse from 'parse';

// Create the Character class (the correct class name now is 'Characters')
const Characters = Parse.Object.extend('Characters');
// Create the Power class (the correct class name is 'Powers')
const Powers = Parse.Object.extend('Powers');

// Create a function to fetch all characters and their associated powers using pointers
export const getAllCharacters = async () => {
    const query = new Parse.Query(Characters);
    
    try {
        const results = await query.find();  // Get all characters
        
        const charactersWithPowers = await Promise.all(
            results.map(async (character) => {
                const characterName = character.get('name');
                console.log('Character:', characterName);

                // Query the Powers class and filter by the character pointer
                const powerQuery = new Parse.Query(Powers);
                powerQuery.equalTo('character', character); // Using Pointer to filter by character
                
                const powers = await powerQuery.find();
                console.log('Powers:', powers.map(power => power.get('name')).join(', '));

                // Return character and associated powers
                return {
                    ...character.toJSON(),
                    powers: powers.map(power => power.get('name')), // Only return the 'name' of each power
                };
            })
        );
        
        console.log('Fetched characters:', charactersWithPowers);
        return charactersWithPowers;
    } catch (error) {
        console.error('Error fetching characters:', error.message);
        console.error('Stack trace:', error.stack);
        return [];
    }
};

// Function to create a new character and link multiple powers using pointers
export const createCharacterWithPowers = async (name, species, age, gender, powerNames) => {
    try {
        // Step 1: Create a new Character
        const character = new Parse.Object('Characters');
        character.set('name', name);
        character.set('species', species);
        character.set('age', age);
        character.set('gender', gender);

        // Save the character first, to get its objectId for the pointer
        await character.save();

        // Step 2: Create and link Powers using Pointers
        const powerObjects = [];
        for (let powerName of powerNames) {
            const powerQuery = new Parse.Query(Powers);
            powerQuery.equalTo('name', powerName);

            // Check if the power already exists
            let power = await powerQuery.first();
            if (!power) {
                // If not found, create the power
                power = new Parse.Object('Powers');
                power.set('name', powerName);
                await power.save();  // Save the new power
            }

            // Add the power to the character's powers relation
            powerObjects.push(power); // Store power objects for the relation
        }

        // Step 3: Add powers to the character's relation field
        const relation = character.relation('powers');
        powerObjects.forEach((power) => relation.add(power));

        // Step 4: Save the character again after linking powers
        await character.save();

        console.log('Character and powers saved successfully.');
    } catch (error) {
        console.error('Error creating character and linking powers:', error.message);
        console.error('Stack trace:', error.stack);
    }
};

// Function to get a single character by ID (with powers linked via pointer)
export const getCharacterById = async (id) => {
    const query = new Parse.Query(Characters);
    try {
        const character = await query.get(id);

        // Query the Powers associated with this character
        const powerQuery = new Parse.Query(Powers);
        powerQuery.equalTo('character', character);  // Using Pointer to filter by character

        const powers = await powerQuery.find();
        console.log('Character:', character.get('name'));
        console.log('Powers:', powers.map(power => power.get('name')).join(', '));

        return {
            ...character.toJSON(),
            powers: powers.map(power => power.get('name')),
        };
    } catch (error) {
        console.error('Error fetching character by ID:', error.message);
        console.error('Stack trace:', error.stack);
        return null;
    }
};

// Function to update a character's powers (add new powers)
export const updateCharacterPowers = async (characterId, newPowers) => {
    const query = new Parse.Query(Characters);
    try {
        const character = await query.get(characterId);

        // Step 1: Split the new powers into an array
        const powerNames = newPowers.split(',').map(power => power.trim());

        // Step 2: Create and link new Powers using pointers
        const powerObjects = [];
        for (let powerName of powerNames) {
            const powerQuery = new Parse.Query(Powers);
            powerQuery.equalTo('name', powerName);

            let power = await powerQuery.first();
            if (!power) {
                power = new Parse.Object('Powers');
                power.set('name', powerName);
                await power.save();  // Save the new power
            }

            powerObjects.push(power); // Store power objects for the relation
        }

        // Step 3: Add powers to the character's relation field
        const relation = character.relation('powers');
        powerObjects.forEach((power) => relation.add(power));

        // Step 4: Save the character again after linking powers
        await character.save();

        console.log('Character powers updated successfully.');
    } catch (error) {
        console.error('Error updating character powers:', error.message);
        console.error('Stack trace:', error.stack);
    }
};

// Function to add a new power to an existing character
export const addPowerToCharacter = async (characterId, powerName) => {
    const characterQuery = new Parse.Query(Characters);
    const powerQuery = new Parse.Query(Powers);

    try {
        // Fetch the character by ID
        const character = await characterQuery.get(characterId);

        // Check if the power exists, if not, create it
        powerQuery.equalTo('name', powerName);
        let power = await powerQuery.first();
        if (!power) {
            power = new Parse.Object('Powers');
            power.set('name', powerName);
            await power.save();  // Save the new power
        }

        // Set the pointer to the character
        power.set('character', character); // Set the pointer to the Character

        // Save the power
        await power.save();
        console.log('New power added to character successfully.');
    } catch (error) {
        console.error('Error adding power to character:', error.message);
        console.error('Stack trace:', error.stack);
    }
};

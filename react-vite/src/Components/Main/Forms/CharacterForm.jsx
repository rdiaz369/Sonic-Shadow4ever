import { useState } from 'react';
import Parse from 'parse';
import CharacterList from '../../../database/queries/CharacterList'; // Import CharacterList to display characters
import PowerQuery from '../../../database/queries/PowerQuery'; // Import PowerQuery to assign powers

const CharacterForm = () => {
  const [name, setName] = useState('');
  const [powerName, setPowerName] = useState(''); // New state for power name
  const [powerAge, setPowerAge] = useState(''); // New state for power age
  const [powerGender, setPowerGender] = useState(''); // New state for power gender
  const [characterToDelete, setCharacterToDelete] = useState(''); // State to store the character name to delete
  const [refreshTrigger, setRefreshTrigger] = useState(false); // State to trigger refresh
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  // Function to create a new character and its power
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create Character
      const Character = Parse.Object.extend('Characters');
      const character = new Character();
      character.set('name', name);

      await character.save();

      // After character is saved, create the power and link it to the new character
      if (powerName) {
        const Power = Parse.Object.extend('Powers');
        const power = new Power();
        power.set('name', powerName);
        power.set('age', parseInt(powerAge));
        power.set('gender', powerGender);
        power.set('character', character); // Link power to the character

        await power.save();
      }

      setName('');
      setPowerName('');
      setPowerAge('');
      setPowerGender('');
      setRefreshTrigger(!refreshTrigger); // Trigger a refresh
    } catch (error) {
      console.error('Error adding character and power:', error);
    }
  };

  // Function to delete character and its linked powers
  const handleDeleteCharacter = async () => {
    if (!characterToDelete) {
      console.log('No character name provided for deletion.');
      return;
    }

    try {
      // First, query the character by name
      const Character = Parse.Object.extend('Characters');
      const query = new Parse.Query(Character);
      query.equalTo('name', characterToDelete);
      const character = await query.first(); // Fetch the first matching character

      if (!character) {
        console.log('Character not found.');
        return;
      }

      // Delete all Powers linked to this character
      const Power = Parse.Object.extend('Powers');
      const powerQuery = new Parse.Query(Power);
      powerQuery.equalTo('character', character);
      const powersToDelete = await powerQuery.find();

      // Deleting all powers associated with the character
      for (let power of powersToDelete) {
        await power.destroy();
      }

      // Now delete the character itself
      await character.destroy();

      // Clear the delete input and trigger refresh
      setCharacterToDelete('');
      setRefreshTrigger(!refreshTrigger); // Trigger a refresh
      console.log(`Character and all associated powers deleted.`);
    } catch (error) {
      console.error('Error deleting character and powers:', error);
    }
  };

  return (
    <div className="container-fluid mt-5 px-3"> {/* Added px-3 to add padding */}
      {/* Add Character Form */}
      <div className="card p-4 mb-4 shadow mx-auto" style={{ maxWidth: '600px' }}>
        <h3 style={{ color: 'green' }} className="text-center mb-3">
          Create a New Character
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Character Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Power Name"
              value={powerName}
              onChange={(e) => setPowerName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              placeholder="Age"
              value={powerAge}
              onChange={(e) => setPowerAge(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Gender"
              value={powerGender}
              onChange={(e) => setPowerGender(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-outline-success">
              Add Character and Power
            </button>
          </div>
        </form>
      </div>

      {/* Character List */}
      <div className="mb-4">
        <h3 style={{ color: 'green' }} className="text-center mb-3">
          Character List
        </h3>
        <CharacterList refreshTrigger={refreshTrigger} searchQuery={searchQuery} />
      </div>

      {/* Delete Character Form */}
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: '600px' }}>
        <h3 style={{ color: 'green' }} className="text-center mb-3">
          Delete Character
        </h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Character Name to Delete"
            value={characterToDelete}
            onChange={(e) => setCharacterToDelete(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleDeleteCharacter}
            className="btn btn-outline-danger"
          >
            Delete Character
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;

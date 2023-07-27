const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  
  document
  .getElementById('fetch-all')
  .addEventListener('click',async function (event) {
    try{
const response= await charactersAPI.getFullList() 
console.log('here are your characters, ', response)
displayAllCharacters(response);
} catch (error) {
  console.error('Error fetching characters:', error);
}
});


  document
  .getElementById('fetch-one')
  .addEventListener('click', async function (event) {
    const characterId = document.getElementById("character-id").value;
    try {
      const character = await charactersAPI.getOneRegister(characterId);
      console.log('Fetched character:', character);
      displayCharacter(character);
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    const characterId = document.getElementById("delete-id").value;
    const deleteButton = document.getElementById('delete-one');
    try {
      const deletedCharacter = await charactersAPI.deleteOneRegister(characterId);
      console.log('Deleted character:', deletedCharacter);
      deleteButton.style.backgroundColor = 'green'
    } catch (error) {
      console.error('Error deleting character:', error);
      deleteButton.style.backgroundColor = 'red';
    }
  });


  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission (page reload)
    const updateButton = document.getElementById('send-data'); // Assuming the button has id="send-data"

    try {
      // Get the form data
      const formData = new FormData(event.target);
      const characterId = formData.get('chr-id'); // Assuming the ID input has name="chr-id"
      const updatedCharacterData = {
        name: formData.get('name'),
        occupation: formData.get('occupation'),
        weapon: formData.get('weapon'),
        cartoon: formData.get('cartoon') === 'on', // Convert checkbox value to boolean
      };

      // Send the data to the APIHandler function to update the character using HTTP PUT
      const updatedCharacter = await charactersAPI.updateOneRegister(characterId, updatedCharacterData);
      console.log('Updated character:', updatedCharacter);

      // Change button background color to green
      updateButton.style.backgroundColor = 'green';
    } catch (error) {
      console.error('Error updating character:', error);

      // Change button background color to red
      updateButton.style.backgroundColor = 'red';
    }
  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    event.preventDefault(); 
    const createButton = document.getElementById('send-nData');

    try {
      const formData = new FormData(event.target);
      const newCharacterData = {
        name: formData.get('name'),
        occupation: formData.get('occupation'),
        weapon: formData.get('weapon'),
        cartoon: formData.get('cartoon') === 'on', 
      };

      
      const createdCharacter = await charactersAPI.createOneRegister(newCharacterData);
      console.log('Created character:', createdCharacter);

      createButton.style.backgroundColor = 'green';
    } catch (error) {
      console.error('Error creating character:', error);

      createButton.style.backgroundColor = 'red';
    }
  });

})

function displayAllCharacters(characters) {
  const charactersContainer = document.querySelector('.characters-container');
  charactersContainer.innerHTML = ''; 
  characters.forEach((character) => {
    const characterInfo = document.createElement('div');
    characterInfo.classList.add('character-info');
    characterInfo.innerHTML = `
      <div class="name">Name: ${character.name}</div>
      <div class="occupation">Occupation: ${character.occupation}</div>
      <div class="cartoon">Is a Cartoon: ${character.cartoon ? 'Yes' : 'No'}</div>
      <div class="weapon">Weapon: ${character.weapon}</div>
    `;
    charactersContainer.appendChild(characterInfo);
  });
}

function displayCharacter(character) {
  document.getElementById('character-name').textContent = `Name: ${character.name}`;
  document.getElementById('character-occupation').textContent = `Occupation: ${character.occupation}`;
  document.getElementById('character-cartoon').textContent = `Is a Cartoon: ${character.cartoon ? 'Yes' : 'No'}`;
  document.getElementById('character-weapon').textContent = `Weapon: ${character.weapon}`;
}


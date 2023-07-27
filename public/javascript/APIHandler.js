


class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList()  {
    const response = await axios.get("http://localhost:8000/characters");
    console.log (response)
    if (response.status === 200){
      
     return response.data;
    }
  } 


  async getOneRegister(characterId){
    const response = await axios.get(`${this.BASE_URL}/characters/${characterId}`)
    console.log (response)
    if (response.status === 200){
      
     return response.data;
    }
  }

    

  async createOneRegister (characterInfo) {
    try {const response = await axios
      .post("http://localhost:8000/characters/", characterInfo);
    
      return response.data;
    }
    catch (error){
  }
}

  async updateOneRegister(characterId, characterInfo){
    try {
      const response = await axios.put(`http://localhost:8000/characters/${characterId}`, characterInfo);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error updating character:', response.statusText);
        throw new Error('Failed to update character.');
      }
    } catch (error) {
      console.error('Error updating character:', error);
      throw error;
    }
  }
  


  async deleteOneRegister(characterId) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/characters/${characterId}`);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error deleting character:', response.statusText);
        throw new Error('Failed to delete character.');
      }
    } catch (error) {
      console.error('Error deleting character:', error);
      throw error;
    }
  }
}


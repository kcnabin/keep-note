import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response
  } catch (error) {
    console.log(`Can't fetch`)
    console.log(error)
  }
}

export default {getAll}
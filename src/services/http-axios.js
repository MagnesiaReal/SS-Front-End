import axios from 'axios'

export default axios.create({
  baseURL : "http://localhost:50000/routes",
  mode : 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-type": "application/json"
    }
})

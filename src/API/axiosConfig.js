import axios from "axios";

const axiosSettings={
    //API URL
    baseURL:"https://localhost:5000/api/",

    headers: {
        "Content-type": "application/json",
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
}

export default axios.create(axiosSettings)
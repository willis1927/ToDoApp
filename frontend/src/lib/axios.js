import axios from "axios"

const BASE_URL = import.meta.env.MODE === "development" ? "https://crowded-poltergeist-7v9xg5vq9xpw2pvx4-5001.app.github.dev/api" : "/api"
const api = axios.create({
    baseURL: BASE_URL
})


export default api
import axios from "axios"

const api = axios.create({
    baseURL: "https://crowded-poltergeist-7v9xg5vq9xpw2pvx4-5001.app.github.dev/api"
})


export default api
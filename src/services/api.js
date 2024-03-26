import axios from 'axios';

// Rodar com IPV4: json-server --host 192.168.1.109 --port 3001 --watch db.json
// Rodar sem IPV4: json-server --watch db.json --port 3001

const api = axios.create({
    baseURL: 'http://192.168.1.100:3001'
});


export default api;
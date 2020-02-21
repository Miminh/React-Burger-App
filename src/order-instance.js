
import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://reac-mimin-2-burger.firebaseio.com/'
});

export default instance;
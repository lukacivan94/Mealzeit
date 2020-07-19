import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mealzeit.herokuapp.com/'
});

export default instance;
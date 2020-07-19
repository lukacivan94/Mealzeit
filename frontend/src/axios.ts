import axios from 'axios';

/** (✓)
 * This is axios instance with base url to use in all components
 */
const instance = axios.create({
    baseURL: 'https://mealzeit.herokuapp.com/'
});

export default instance;
// Імпортував бібліотеку axios
import axios from 'axios';
// Імпортував ключі для функцій getBreeds і getCat
import keys from './keys';

const headers = {
  'x-api-key': keys.api_key,
};

// Отримаємо проміс з елементами порід
export function getBreeds() {
  return axios
    .get(`${keys.BASE_URL}breeds`, { headers })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

// Отримаємо проміс з об'єктом породи
export function getCat(catId) {
  return axios
    .get(`${keys.BASE_URL}images/search?breed_ids=${catId}`, { headers })
    .then(response => {
      return response.data;
    });
}

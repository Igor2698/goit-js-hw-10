// Імпоруємо бібліотеки
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';
import Notiflix from 'notiflix';
// Імпортуємо файли JS
import { getBreeds, getCat } from './js/cat-api';
import refs from './js/refs';
// Параметри бібліотеки Notiflix
Notiflix.Notify.init({
  width: '400px',
  position: 'center-top',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
  textColor: '#fff',
});

// Оголошую змінну library, яка використовується щоб приховувати селект
let library = '';

// Ініціалізую завантаження елементів в селект при завантаженні сторінки
init();

// Змінна, яка зберігає в собі значення елементів, отриманих з бекенду, щоб потім перевикористати їх в функції
let posts = [];

// Функція виконується при завантаженні сторінки
async function init() {
  toggleLoading(true);
  try {
    const data = await getBreeds();
    // Функція-індикатор завантаження інформації з бекенду
    toggleLoading(false);
    // Зберігаю данні порід, отриманих з бекенду у окрему змінну
    posts = data;
    // Викликаю функцію рендеру розмітки елементів селекту
    renderBreedOptions(posts);
  } catch (error) {
    itIsError(error);
  }
}

// Фунція рендеру розмітки елементів селекту
function renderBreedOptions(data) {
  const markup = data
    .map(({ name, id }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');

  refs.select.innerHTML = markup;
  // Ініціалізував виклик бібліотеки Choices для видозміни селекту
  const choices = new Choices(refs.select);
  // Перезаписав значення змінної library(необхідно робити тільки після видозміни селекту)
  library = document.querySelector('.choices');
}

// Ініціалізую подію change на селекті
refs.select.addEventListener('change', handlerChangeOnSelect);

// Виклик функції при події change на селекті
function handlerChangeOnSelect() {
  // Виконується завантаження елементів, змінюємо стан функції-індикатора toggleLoading
  toggleLoading(true);
  // Ініціюємо змінну, яка зберігає об'єкт, id якого збігається з value
  const findedCat = posts.find(cat => cat.id === refs.select.value);
  // Функція зберігає значення id вибраного об'єкту
  const catId = findedCat.id;

  // Отримую данні з бекенду про обраний об'єкт
  getCat(catId)
    .then(data => {
      // Відбулося завантаження елементів, змінюємо стан функції-індикатора
      toggleLoading(false);
      // Зберігаю у змінну значення отриманого об'єкту
      const infoAboutCat = data[0].breeds[0];
      // Зберігаю у змінну значення атрибуту url отриманого об'єкту
      const image = data[0].url;
      // Зберігаю значення розмірів зображення, отриманого з об'єкту, щоб розуміти орієнтацію картинки(вертикальне чи горизонтальне)
      const seizes = {
        height: data[0].height,
        width: data[0].width,
      };
      // Викликаю функцію, яка генерує розмітку сторінки після отримання данних з бекенду
      renderBreedInfo(infoAboutCat, image);
      // Фунцкія змінює розміри завантаженої картинки
      generateSizeOfImage(seizes.height, seizes.width);
    })
    .catch(error => {
      itIsError(error);
    });
}

// Функція рендерить розмітку сторінки щодо обраного елементу в селекті
function renderBreedInfo({ name, description, image, temperament }, img) {
  refs.div.innerHTML = `<img src="${img}"   alt="${name}"><div class="container"><h1>${name}</h1>
    <p class="description">${description}</p><p><span class="span">Temperament</span>: ${temperament}</p></div>`;
}

// Функція-індикатор, яка приховує чи демонструє елементи на сторінці, в залежності від того, відбувається завантаження чи ні
function toggleLoading(isLoading) {
  if (isLoading) {
    refs.div.style.display = 'none';
    refs.loading.style.display = 'inline-block';
    if (library) {
      library.hidden = true;
    }
  } else {
    refs.div.style.display = 'flex';
    refs.loading.style.display = 'none';
    refs.select.style.display = 'block';
    if (library) {
      library.hidden = false;
    }
  }
}
// Функція, яка приховує чи відображає елементи на сторінці, якщо виявлено помилку
function itIsError(error) {
  console.log(error);
  refs.div.style.display = 'none';
  refs.loading.hidden = true;
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
// Функція зміни розмірів картинки при рендері(відштовхуємось від того, горизонтальна чи вертакальна орієнтація була отримана з бекенду)
function generateSizeOfImage(height, width) {
  const img = document.querySelector('img');

  if (width > height) {
    img.style.width = '600' + 'px';
    img.style.height = '450' + 'px';
  } else {
    img.style.width = '500' + 'px';
    img.style.height = '600' + 'px';
  }
}

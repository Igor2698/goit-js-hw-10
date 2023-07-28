
import Choices from 'choices.js'
import "choices.js/public/assets/styles/choices.min.css"




import Notiflix from 'notiflix';
Notiflix.Notify.init({
    width: '400px',
    position: 'center-top',
    distance: '10px',
    opacity: 1,
    clickToClose: true,
    textColor: '#fff',
    // ...
});
import { fetchBreeds, fetchPosts } from './js/cat-api'
const loading = document.querySelector('.loader')
const body = document.querySelector('body')
const div = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');



init();

let posts = [];

async function init() {
    toggleLoading(true);
    try {
        const data = await fetchBreeds();
        toggleLoading(false);
        posts = data;
        renderBreedOptions(posts);
    } catch (error) {
        itIsError(error);
    }
}

function renderBreedOptions(data) {
    const markup = data
        .map(({ name, id }) => {
            return `<option value="${id}">${name}</option>`;
        })
        .join("");


    select.innerHTML = markup;
    const choices = new Choices(select);


}





select.addEventListener('change', () => {
    toggleLoading(true);
    const findedCat = posts.find(cat => cat.id === select.value);
    const catId = findedCat.id;
    fetchPosts(catId).then((data) => {
        toggleLoading(false);
        const infoAboutCat = data[0].breeds[0];
        const image = data[0].url;
        const seizes = {
            height: data[0].height,
            width: data[0].width
        }
        renderBreedInfo(infoAboutCat, image)
        generateSizeOfImage(seizes.height, seizes.width)
    })
        .catch((error) => {
            itIsError(error);
        });
});

function renderBreedInfo({ name, description, image, temperament }, img) {
    div.innerHTML = `<img src="${img}"   alt="${name}"><div class="container"><h1>${name}</h1>
    <p class="description">${description}</p><p><span class="span">Temperament</span>: ${temperament}</p></div>`;
}




function toggleLoading(isLoading) {

    if (isLoading) {
        div.style.display = 'none';
        loading.style.display = 'inline-block';



    }
    else {
        div.style.display = 'flex';
        loading.style.display = 'none';
        select.style.display = 'block';
        


    }


}

function itIsError(error) {
    console.log(error);
    div.style.display = 'none';
    loading.hidden = true;
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');

}

function generateSizeOfImage(height, width) {
    const img = document.querySelector('img')

    if (width > height) {
        img.style.width = "600" + "px"
        img.style.height = "450" + "px"
    }
    else {
        img.style.width = "500" + "px"
        img.style.height = "600" + "px"
    }
}




















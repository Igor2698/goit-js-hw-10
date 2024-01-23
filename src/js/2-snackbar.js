import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.elements.delay;

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    const delay = Number(delayInput.value);
    const stateRadioButton = document.querySelector('input[name="state"]:checked');
    const state = stateRadioButton.value;

    const delayMessage = `promise in ${delay}ms`;

    const promise = new Promise((resolve, reject) => setTimeout(() => state === 'fulfilled' ? resolve(`✅ Fulfilled ${delayMessage}`) : reject(`❌ Rejected ${delayMessage}`), delay));

    promise.then(value => iziToast.success({
        title: 'Resolved',
        message: value,
        position: 'topRight',

    }))
        .catch(error => iziToast.error({
            title: 'Rejected',
            message: error,
            position: 'topRight',

        }))
}







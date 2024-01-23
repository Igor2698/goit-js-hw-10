import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');


form.addEventListener('submit', onSubmit);
function onSubmit(ev) {
    ev.preventDefault();
    const checkedInput = document.querySelector('input[name="state"]:checked');

    const delay = form.elements.delay.value;
    const state = checkedInput.value;

    const delayMessage = `promise in ${delay}ms`

    const handleFulfilled = () => Promise.resolve(`✅ Fulfilled ${delayMessage}`).then(value => iziToast.success({
        title: 'Resolved',
        message: value,
        position: 'topCenter',
        timeout: 2000,
    }));
    const handleRejected = () => Promise.reject(`❌ Rejected ${delayMessage}`).then(() => console.log('alall')).catch(error => iziToast.error({
        title: 'Rejected',
        message: error,
        position: 'topCenter',
        timeout: 2000,
    }));

    setTimeout(state === 'fulfilled' ? handleFulfilled : handleRejected, delay);
}







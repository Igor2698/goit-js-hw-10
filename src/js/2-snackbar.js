import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delay = form.elements.delay;



form.addEventListener('submit', onSubmit);
function onSubmit(ev) {
    ev.preventDefault();

    const delay = form.elements.delay.value;
    const state = form.elements.state.value;

    const delayMessage = `promise in ${delay}ms`

    const handleFulfilled = () => Promise.resolve(`✅ Fulfilled ${delayMessage}`).then(value => iziInfo('Resolved', value, 'success'));
    const handleRejected = () => Promise.reject(`❌ Rejected ${delayMessage}`).then(() => console.log('alall')).catch(error => iziInfo('Rejected', error, 'error'));

    setTimeout(state === 'fulfilled' ? handleFulfilled : handleRejected, delay);
}



const iziInfo = (title, message, status) => {
    iziToast[status]({
        title,
        message,
        position: 'topCenter',
        timeout: 2000,
    });
}



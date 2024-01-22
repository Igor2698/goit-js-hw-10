
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const daysDisplay = document.querySelector('.value[data-days]');
const hoursDisplay = document.querySelector('.value[data-hours]');
const minuteDisplay = document.querySelector('.value[data-minutes]');
const secondDisplay = document.querySelector('.value[data-seconds]');


let userSelectedDate;
let intervalId = 0;



const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        handleDateSelection(userSelectedDate);
    },
    onReady() {
        startButton.disabled = true;
    },


};

flatpickr("#datetime-picker", options);

function handleDateSelection(selectedDate) {
    const timeDifference = userSelectedDate - new Date();

    if (timeDifference <= 0) {
        iziInfo('Change your choice', 'Please choose a date in the future')
        startButton.disabled = true;
    }
    else {
        startButton.disabled = false;
    }
}

startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
    startButton.disabled = true;
    intervalId = setInterval(launchTimer, 1000);
}


function launchTimer() {

    const differenceTime = userSelectedDate - new Date();

    if (differenceTime < 0) {
        resetTimer();
        return
    }
    const timeObj = convertMs(differenceTime);
    updateDisplay(timeObj);
}


function resetTimer() {
    daysDisplay.textContent = '00';
    hoursDisplay.textContent = '00';
    minuteDisplay.textContent = '00';
    secondDisplay.textContent = '00';
    clearInterval(intervalId);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}

function updateDisplay({ days, hours, minutes, seconds }) {
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minuteDisplay.textContent = addLeadingZero(minutes);
    secondDisplay.textContent = addLeadingZero(seconds);
}

const iziInfo = (title, message) => {
    iziToast.info({
        title,
        message,
        position: 'topCenter',
        timeout: 2000,
    });
}
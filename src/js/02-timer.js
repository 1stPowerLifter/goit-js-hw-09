import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const now = new Date
    if (selectedDates[0] < now) {
      // window.alert("Please choose a date in the future")
      Notiflix.Notify.failure("Please choose a date in the future");
    } else {
      Notiflix.Notify.success("The timer started")
      btnStart.disabled = false;
      slcDate = selectedDates[0];
      btnStart.addEventListener("click", timer)
    }
  },
};

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

const datetimePicker = document.querySelector("#datetime-picker")
const btnStart = document.querySelector("[data-start]")
btnStart.disabled = true;
let slcDate;
const scoreboard = document.querySelectorAll(".value")

flatpickr(datetimePicker, options)

const timer = function () {
  setInterval(() => {
    const subtraction = slcDate - new Date;
    const timerTime = Object.values(convertMs(subtraction));
    for (let i = 0; i < 3; i++) {
      scoreboard[i].textContent = String(timerTime[i]).padStart(2, "0")
    }
    scoreboard[3].textContent = timerTime[3]
  }, 1000);
}




  



